<template>
  <v-btn :color="color" @click="$emit('click')">
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    color: {
      type: String,
      default: 'primary'
    }
  }
};
</script>
