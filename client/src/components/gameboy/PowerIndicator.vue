<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { io, Socket } from 'socket.io-client'

const socket = ref<Socket | null>(null)
const connected = ref(false)

onMounted(() => {
  // Initialize socket connection
  socket.value = io('http://localhost:3000')

  // Set up event listeners
  socket.value.on('connect', () => {
    console.log('Connected to server')
    connected.value = true
  })

  socket.value.on('disconnect', () => {
    console.log('Disconnected from server')
    connected.value = false
  })

  // Clean up on component unmount
  return () => {
    if (socket.value) {
      socket.value.disconnect()
    }
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
    }

    .online {
      background-color: var(--gameboy-power-led);
    }

    .offline {
      background-color: var(--gameboy-power-led);
      opacity: 0.5;
    }
  }
  </style>
  