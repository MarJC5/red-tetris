<template>
    <div :class="squareClasses" />
  </template>
  
  <script setup lang="ts">
  import { computed, defineProps } from 'vue'
  
  interface Props {
    color: string
  }
  
  const props = defineProps<Props>()
  
  // Compute the classes based on color prop
  const squareClasses = computed(() => `grid-square color-${props.color}`)
  </script>
  
  <style scoped lang="scss">
  </style>
  