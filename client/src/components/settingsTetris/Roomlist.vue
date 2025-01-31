<script setup lang="ts">
  	import { useRoute, useRouter } from 'vue-router'
	import { ref, onMounted, onUnmounted } from 'vue'
	import { io, Socket } from 'socket.io-client'

	const socket = ref<Socket | null>(null)
	const connected = ref(false)
	const roomList = ref([])
	const route = useRoute() 
	const redirect = useRouter();
	const username = ref(route.query.username as string)

	function joinRoom(roomId: string, hostUsername: string, username: string) {
		
		console.log(roomId, hostUsername, username);

		redirect.push({
			name: 'tetris-game',
			params: { id: roomId, username: username }
      	});
	}

	const initializeSocket = () => {
		try {
			socket.value = io('http://localhost:3000')

			socket.value.on('connect', () => {
				console.log('Connected to list')
				connected.value = true

			})

			socket.value.on('room:list', (rooms) => {
				console.log("Rooms :", rooms);
				roomList.value = rooms;
			})

			socket.value.on('disconnect', () => {
				console.log('Disconnected from list')
				connected.value = false
			})
		} catch (error) {
			console.error('Socket list initialization failed:', error)
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
	<div class="room-selector">
		<h2>Choose a room</h2>
		<div v-for="room in roomList" :key="room">
			<button @click="joinRoom(room[0], room[2], username)">{{ room[2] }}'s room</button>
		</div>
	</div>
</template>

<style scoped lang="scss">
.room-selector {
	h2 {
		margin-bottom: 20px;
	}

	button {
		border: solid 2px var(--gameboy-button-shadow);
		background: var(--gameboy-body-primary);
		cursor: pointer;
		color: var(--gameboy-text);
		border-radius: var(--radius-sm);
		font-family: var(--gameboy-body-font);
		width: 100%;
		padding: 2px;
		margin: 2px 0px;
		font-size: 10px;
	}
}
</style>