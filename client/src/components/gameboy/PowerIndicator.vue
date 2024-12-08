<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { io, Socket } from 'socket.io-client'

const socket = ref<Socket | null>(null)
const connected = ref(false)

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
  