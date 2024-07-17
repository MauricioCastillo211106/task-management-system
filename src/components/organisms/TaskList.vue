<template>
  <v-container>
    <v-row>
      <v-col v-for="task in tasks" :key="task.id" cols="12" md="4">
        <TaskCard :task="task" @edit="editTask" @delete="deleteTask" />
      </v-col>
    </v-row>
    <AppButton @click="showAddTaskDialog = true">Add Task</AppButton>
    <TaskForm v-if="showAddTaskDialog" @close="showAddTaskDialog = false" @submit="addTask" />
    <TaskForm
      v-if="showEditTaskDialog"
      :task="currentTask"
      @close="showEditTaskDialog = false"
      @submit="updateTask"
    />
  </v-container>
</template>

<script>
import TaskCard from '@/components/molecules/TaskCard.vue';
import AppButton from '@/components/atoms/Button.vue';
import TaskForm from '@/components/molecules/TaskForm.vue';
import { mapState } from 'vuex';

export default {
  name: 'TaskList',
  components: {
    TaskCard,
    AppButton,
    TaskForm
  },
  data() {
    return {
      showAddTaskDialog: false,
      showEditTaskDialog: false,
      currentTask: null
    };
  },
  computed: {
    ...mapState(['tasks'])
  },
  created() {
    this.$store.dispatch('fetchTasks');
  },
  methods: {
    async addTask(task) {
      await this.$store.dispatch('addTask', task);
      this.showAddTaskDialog = false;
    },
    editTask(task) {
      this.currentTask = task;
      this.showEditTaskDialog = true;
    },
    async updateTask(task) {
      await this.$store.dispatch('updateTask', task);
      this.showEditTaskDialog = false;
    },
    async deleteTask(taskId) {
      await this.$store.dispatch('deleteTask', taskId);
    }
  }
};
</script>
