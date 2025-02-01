<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { io, Socket } from 'socket.io-client'
import { useGameStore } from '@/stores/game'

const connected = ref(false)
const gameStore = useGameStore();

const initializeSocket = () => {
  connected.value = gameStore.setSocket();
}

onMounted(() => {
  // Wait 1 seconds before connecting to the server
  setTimeout(initializeSocket, 1000)
})

onUnmounted(() => {
  // Clean up socket connection
  connected.value = gameStore.deleteSocket();
})
</script>

<template>
    <div class="power-indictator">
      <span :class="{ 'online': connected, 'offline': !connected }"></span>
    </div>
  </template>
  
  <style lang="scss" scoped>
  .power-indictator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.5rem;
    color: var(--color-text);
    
    span {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      transition: background-color 0.2s ease, opacity 0.2s ease;
    }

    .online {
      background-color: var(--gameboy-power-led);
    }

    .offline {
      background-color: var(--gameboy-power-led);
      opacity: 0.3;
    }
  }
  </style>
  