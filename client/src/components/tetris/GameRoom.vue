<script setup lang="ts">
  import GridBoard from '@/components/tetris/GridBoard.vue'
  import GameDetails from '@/components/tetris/GameDetails.vue'
  import { ref, onMounted, onUnmounted } from 'vue';
  import { io, Socket } from 'socket.io-client'
  import { useGameStore } from '@/stores/game'

  const connected = ref(false)
  const bool = ref(false)
  const username = ref("")
  const id = ref("");
  const gameStore = useGameStore();
  const userSocket = gameStore.getSocket();

  function launchGame() {
    bool.value = true;
  }
  
  const parseURL = () => {
    const parsedURL = new URL(window.location.href);
    const hash = parsedURL.hash.substring(1);
    
    let tempUsername = "";
    [id.value, tempUsername] = hash.split('[');
    username.value = tempUsername.replace(']', '');
  }

  const initializeSocket = () => {
    try {
      if (userSocket != null)
        userSocket.emit('game:join', { id: id.value }, { username: username.value })
    } catch (error) {
      console.error('Socket room initialization failed:', error)
    }
  }

  onMounted(() => {
    // Parse the url to have username and id
    parseURL()

    // Wait 1 seconds before connecting to the server
    setTimeout(initializeSocket, 1000)
  })

  onUnmounted(() => {
    // Clean up socket connection
    if (userSocket) {
      userSocket.emit('game:leave', { id: id.value }, { username: username.value })
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