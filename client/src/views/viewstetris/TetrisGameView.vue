<script lang="ts" setup>
  import GridBoard from '@/components/tetris/GridBoard.vue'
  import GameDetails from '@/components/tetris/GameDetails.vue'
  
  import { computed } from 'vue' 
  import { useRoute } from 'vue-router'

  const route = useRoute() 
  const username = computed(() => route.params.username as string)
</script>

<template>
  <div class="tetris">
    <GameDetails />
    <GridBoard />
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
