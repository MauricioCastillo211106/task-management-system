<template>
  <span>{{ title }}</span>
</template>

<script>
export default {
  name: 'TaskTitle',
  props: {
    title: {
      type: String,
      required: true
    }
  }
};
</script>
