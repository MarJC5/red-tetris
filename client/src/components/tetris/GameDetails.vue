<template>
  <div class="game-details">
    <NextBlock />
    <div class="game-details__score">
        <p>Score: <br/> 0</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import NextBlock from './NextBlock.vue'
</script>

<style scoped lang="scss">
.game-details {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  align-content: center;
  height: 100%;
  width: 100px;
}
</style>
