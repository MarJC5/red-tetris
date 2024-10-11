<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, ref } from 'vue'
import { io, Socket } from 'socket.io-client'

const socket = ref<Socket | null>(null)
const connected = ref(false)
const message = ref('')
const serverMessage = ref('')

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
  <header>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
  </header>

  <RouterView />

  <footer>
    <p>Socket.IO Status: {{ connected ? 'Connected' : 'Disconnected' }}</p>
  </footer>
</template>

<style scoped>
</style>