import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Definimos las variables del token API y el parámetro del token desde los environment variables
const apiToken = process.env.VUE_APP_API_TOKEN;
const apiTokenParam = process.env.VUE_APP_API_TOKEN_PARAM;

export default new Vuex.Store({
  state: {
    tasks: [], // Estado para almacenar todas las tareas
    task: null // Estado para almacenar una tarea individual
  },
  mutations: {
    // Mutación para establecer todas las tareas en el estado
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    // Mutación para establecer una tarea individual en el estado
    SET_TASK(state, task) {
      state.task = task;
    },
    // Mutación para agregar una nueva tarea al estado
    ADD_TASK(state, task) {
      state.tasks.push(task);
    },
    // Mutación para actualizar una tarea existente en el estado
    UPDATE_TASK(state, updatedTask) {
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        Vue.set(state.tasks, index, updatedTask);
      }
    },
    // Mutación para eliminar una tarea del estado
    DELETE_TASK(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    }
  },
  actions: {
    // Acción para obtener todas las tareas
    async fetchTasks({ commit }) {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${apiToken}`);
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      try {
        const response = await fetch(
          `https://ecsdevapi.nextline.mx/vdev/tasks-challenge/tasks?token=${apiTokenParam}`,
          requestOptions
        );
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        console.log('Fetched tasks:', data); // Añadir un log para ver los datos obtenidos
        commit('SET_TASKS', data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
      }
    },
    // Acción para obtener una tarea específica por su ID
    async fetchTask({ commit }, taskId) {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${apiToken}`);
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      try {
        const response = await fetch(
          `https://ecsdevapi.nextline.mx/vdev/tasks-challenge/tasks/${taskId}?token=${apiTokenParam}`,
          requestOptions
        );
        if (!response.ok) {
          throw new Error('Failed to fetch task');
        }
        const data = await response.json();
        commit('SET_TASK', data);
      } catch (error) {
        console.error('Error fetching task:', error);
        throw error;
      }
    },
    // Acción para agregar una nueva tarea
    async addTask({ commit }, task) {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${apiToken}`);
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

      const urlencoded = new URLSearchParams();
      urlencoded.append('token', apiTokenParam); // Uso del token
      urlencoded.append('title', task.title);
      urlencoded.append('is_completed', task.is_completed ? '1' : '0');
      urlencoded.append('due_date', task.due_date);
      urlencoded.append('comments', task.comments);
      urlencoded.append('description', task.description);
      urlencoded.append('tags', task.tags);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      try {
        const response = await fetch(
          'https://ecsdevapi.nextline.mx/vdev/tasks-challenge/tasks',
          requestOptions
        );
        if (!response.ok) {
          throw new Error('Failed to add task');
        }
        const data = await response.json();
        commit('ADD_TASK', data);
      } catch (error) {
        console.error('Error adding task:', error);
        throw error;
      }
    },
    // Acción para actualizar una tarea existente
    async updateTask({ commit }, task) {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${apiToken}`);
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

      const urlencoded = new URLSearchParams();
      urlencoded.append('token', apiTokenParam); // Uso del token
      urlencoded.append('title', task.title);
      urlencoded.append('is_completed', task.is_completed ? '1' : '0');
      urlencoded.append('due_date', task.due_date);
      urlencoded.append('comments', task.comments);
      urlencoded.append('description', task.description);
      urlencoded.append('tags', task.tags);

      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      try {
        const response = await fetch(
          `https://ecsdevapi.nextline.mx/vdev/tasks-challenge/tasks/${task.id}`,
          requestOptions
        );
        if (!response.ok) {
          throw new Error('Failed to update task');
        }
        const data = await response.json();
        commit('UPDATE_TASK', data);
      } catch (error) {
        console.error('Error updating task:', error);
        throw error;
      }
    },
    // Acción para eliminar una tarea
    async deleteTask({ commit }, taskId) {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${apiToken}`);
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

      const urlencoded = new URLSearchParams();
      urlencoded.append('token', apiTokenParam); // Uso del token

      const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      try {
        const response = await fetch(
          `https://ecsdevapi.nextline.mx/vdev/tasks-challenge/tasks/${taskId}`,
          requestOptions
        );
        if (!response.ok) {
          throw new Error('Failed to delete task');
        }
        commit('DELETE_TASK', taskId);
      } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
      }
    }
  },
  getters: {
    tasks: (state) => state.tasks, // Getter para obtener todas las tareas
    task: (state) => state.task // Getter para obtener una tarea específica
  }
});
