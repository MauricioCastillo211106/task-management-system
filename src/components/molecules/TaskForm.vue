<template>
  <v-form @submit.prevent="handleSubmit">
    <v-text-field label="Title" v-model="localTask.title" required></v-text-field>
    <v-text-field label="Description" v-model="localTask.description" required></v-text-field>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="localTask.due_date"
          label="Due Date"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="localTask.due_date" no-title @input="menu = false"></v-date-picker>
    </v-menu>
    <v-text-field label="Comments" v-model="localTask.comments" required></v-text-field>
    <v-text-field label="Tags" v-model="localTask.tags" required></v-text-field>
    <v-checkbox label="Completed" v-model="localTask.is_completed"></v-checkbox>
    <v-btn type="submit" color="primary">Submit</v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'TaskForm',
  props: {
    task: {
      type: Object,
      default: () => ({
        title: '',
        description: '',
        due_date: '',
        comments: '',
        tags: '',
        is_completed: 0
      })
    }
  },
  data() {
    return {
      localTask: { ...this.task },
      menu: false
    };
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.localTask);
    }
  }
};
</script>
