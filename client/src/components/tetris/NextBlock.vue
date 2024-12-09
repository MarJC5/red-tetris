<template>
  <div class="next-block">
    <template v-for="(row, rowIndex) in nextBlockGrid" :key="rowIndex">
      <GridSquare
        v-for="(square, colIndex) in row"
        :key="`${rowIndex}${colIndex}`"
        :color="'empty'"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import GridSquare from './GridSquare.vue'
import { NEXT_PIECE_DATA } from '../utils/NextPieceData'


interface Props {
  nextPiece?: number[][]
}

const props = withDefaults(defineProps<Props>(), {
  nextPiece: () => [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
})

const nextBlockGrid = computed(() => props.nextPiece)
</script>

<style scoped lang="scss"></style>
