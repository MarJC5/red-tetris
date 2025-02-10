<script setup lang="ts">
  	import { useRoute, useRouter } from 'vue-router'
	import { ref, onMounted, onUnmounted } from 'vue'
	import { useGameStore } from '@/stores/game'

	const route = useRoute() 
	const redirect = useRouter();
	const username = ref(route.query.username as string)
	const gameStore = useGameStore();

	function joinRoom(roomId: string, hostUsername: string, username: string) {
		
		console.log(roomId, hostUsername, username);

		redirect.push({
			name: 'tetris-game',
			params: { id: roomId, username: username }
      	});
	}
</script>

<template>
	<div class="room-selector">
		<h2>Choose a room</h2>
		<div v-for="room in gameStore.getRoomList()" :key="room">
			<button @click="joinRoom(room[0], room[2], username)">{{ room[2] }}'s room</button>
		</div>
		<div v-if="gameStore.getRoomList().length == 0">
			Oh... room is empty !
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