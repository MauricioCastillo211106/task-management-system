import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    task: null
  },
  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    SET_TASK(state, task) {
      state.task = task;
    },
    ADD_TASK(state, task) {
      state.tasks.push(task);
    },
    UPDATE_TASK(state, updatedTask) {
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        Vue.set(state.tasks, index, updatedTask);
      }
    },
    DELETE_TASK(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    }
  },
  actions: {
    async fetchTasks({ commit }) {
      const myHeaders = new Headers();
      myHeaders.append(
        'Authorization',
        'Bearer e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd'
      );

      const params = new URLSearchParams();
      params.append('token', 'YourToken'); // Reemplaza "YourToken" con el token correcto

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      try {
        const response = await fetch(
          `https://ecsdevapi.nextline.mx/vdev/tasks-challenge/tasks?${params.toString()}`,
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
    async fetchTask({ commit }, taskId) {
      const myHeaders = new Headers();
      myHeaders.append(
        'Authorization',
        'Bearer e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd'
      );

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      try {
        const response = await fetch(
          `https://ecsdevapi.nextline.mx/vdev/tasks-challenge/tasks/${taskId}`,
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
    async addTask({ commit }, task) {
      const myHeaders = new Headers();
      myHeaders.append(
        'Authorization',
        'Bearer e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd'
      );
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

      const urlencoded = new URLSearchParams();
      urlencoded.append('token', 'YourToken'); // Reemplaza "YourToken" con el token correcto si es necesario
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
    async updateTask({ commit }, task) {
      const myHeaders = new Headers();
      myHeaders.append(
        'Authorization',
        'Bearer e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd'
      );
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

      const urlencoded = new URLSearchParams();
      urlencoded.append('token', 'YourToken'); // Reemplaza "YourToken" con el token correcto si es necesario
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
    async deleteTask({ commit }, taskId) {
      const myHeaders = new Headers();
      myHeaders.append(
        'Authorization',
        'Bearer e864a0c9eda63181d7d65bc73e61e3dc6b74ef9b82f7049f1fc7d9fc8f29706025bd271d1ee1822b15d654a84e1a0997b973a46f923cc9977b3fcbb064179ecd'
      );
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

      const urlencoded = new URLSearchParams();
      urlencoded.append('token', 'YourToken'); // Reemplaza "YourToken" con el token correcto

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
    tasks: (state) => state.tasks,
    task: (state) => state.task
  }
});
