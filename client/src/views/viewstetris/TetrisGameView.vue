<script lang="ts" setup>
  import GameRoom from '@/components/tetris/GameRoom.vue'
</script>

<template>
  <div class="tetris">
    <GameRoom />
  </div>
</template>

<style scoped lang="scss">
  .tetris {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        align-content: center;
        height: 100%;
  }
</style>
