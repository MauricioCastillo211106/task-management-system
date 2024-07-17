<template>
  <v-container>
    <TaskList />
  </v-container>
</template>

<script>
import TaskList from '@/components/organisms/TaskList.vue';

export default {
  name: 'Home',
  components: {
    TaskList
  }
};
</script>
