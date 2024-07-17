<template>
  <v-text-field :label="label" v-model="inputValue" />
</template>

<script>
export default {
  name: 'Input',
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      inputValue: this.value
    };
  },
  watch: {
    inputValue(newVal) {
      this.$emit('input', newVal);
    },
    value(newVal) {
      this.inputValue = newVal;
    }
  }
};
</script>
