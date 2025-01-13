<script setup lang="ts">
  import GridBoard from '@/components/tetris/GridBoard.vue'
  import GameDetails from '@/components/tetris/GameDetails.vue'
  import { ref, onMounted, onUnmounted } from 'vue';
  import { io, Socket } from 'socket.io-client'

  const socket = ref<Socket | null>(null)
  const connected = ref(false)
  const bool = ref(false)

  function launchGame() {
    bool.value = true;
  }

  const initializeSocket = () => {
    try {
      socket.value = io('http://localhost:3000')

      socket.value.on('connect', () => {
        console.log('Connected to server')
        connected.value = true
      })

      socket.value.on('disconnect', () => {
        console.log('Disconnected from server')
        connected.value = false
      })
    } catch (error) {
      console.error('Socket initialization failed:', error)
    }
  }

  onMounted(() => {
    // Wait 1 seconds before connecting to the server
    setTimeout(initializeSocket, 1000)
  })

  onUnmounted(() => {
    // Clean up socket connection
    if (socket.value) {
      socket.value.disconnect()
      socket.value = null
    }
  })
</script>

<template>
    <template v-if="bool == false">
      <button @click="launchGame">Launch Game</button>
    </template>
    <template v-else>
      <GameDetails />
      <GridBoard />
    </template>
</template>

<style scoped lang="scss">
</style>