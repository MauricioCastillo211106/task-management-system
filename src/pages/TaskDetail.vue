<template>
  <v-container v-if="task">
    <v-row>
      <v-col cols="12">
        <h1>{{ task.title }}</h1>
        <p>{{ task.description }}</p>
        <p><strong>Due Date:</strong> {{ task.due_date }}</p>
        <p><strong>Comments:</strong> {{ task.comments }}</p>
        <p><strong>Tags:</strong> {{ task.tags }}</p>
        <p><strong>Completed:</strong> {{ task.is_completed ? 'Yes' : 'No' }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'TaskDetail',
  computed: {
    ...mapState(['task'])
  },
  created() {
    const taskId = this.$route.params.id; // Asume que el id de la tarea está en los parámetros de la ruta
    this.$store.dispatch('fetchTask', taskId);
  }
};
</script>
