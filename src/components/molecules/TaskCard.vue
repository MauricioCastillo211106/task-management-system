<template>
  <v-card>
    <v-card-title>{{ task.title }}</v-card-title>
    <v-card-subtitle>{{ task.due_date }}</v-card-subtitle>
    <v-card-text> Completed: {{ task.is_completed ? 'Yes' : 'No' }} </v-card-text>
    <v-card-actions>
      <AppButton color="primary" @click="editTask">Edit</AppButton>
      <AppButton color="error" @click="deleteTask">Delete</AppButton>
    </v-card-actions>
  </v-card>
</template>

<script>
import AppButton from '@/components/atoms/Button.vue';

export default {
  name: 'TaskCard',
  components: {
    AppButton
  },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  methods: {
    editTask() {
      this.$emit('edit', this.task);
    },
    deleteTask() {
      this.$emit('delete', this.task.id);
    }
  }
};
</script>
