<script setup lang="ts">
  	import { useRoute } from 'vue-router'
	import { ref, onMounted, onUnmounted } from 'vue';
	import { io, Socket } from 'socket.io-client'

	const socket = ref<Socket | null>(null)
	const connected = ref(false)

	const initializeSocket = () => {
		try {
			socket.value = io('http://localhost:3000')

			socket.value.on('connect', () => {
				console.log('Connected to room')
				connected.value = true

			})

			socket.value.on('disconnect', () => {
				console.log('Disconnected from room')
				connected.value = false
			})
		} catch (error) {
			console.error('Socket room initialization failed:', error)
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
  
  	const route = useRoute() 
	const username = ref(route.query.username as string)
</script>

<template>
	<div class="room-selector">
		<h2>Choose a room</h2>
	</div>
</template>

<style scoped lang="scss">
</style>