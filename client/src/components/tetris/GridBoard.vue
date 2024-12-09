<template>
    <div class="grid-board">
      <template v-for="(row, rowIndex) in gridState" :key="rowIndex">
        <GridSquare 
          v-for="(cell, colIndex) in row" 
          :key="`${colIndex}${rowIndex}`"
          :color="'empty'"
        />
      </template>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import GridSquare from './GridSquare.vue';
  
  interface Props {
    board?: number[][];
  }
  
  const props = withDefaults(defineProps<Props>(), {
    board: () => Array(18).fill(Array(10).fill(0))
  });
  
  // Create a reactive grid state
  const gridState = computed(() => {
    return props.board;
  });
  </script>
  
  <style scoped lang="scss">
  </style>