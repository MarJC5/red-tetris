<script lang="ts" setup>
	import { ref } from 'vue' 
	
	const username = ref('')
</script>

<template>
	<div class="usernameSelector">
		<h2>Choisissez votre nom</h2>
		<input v-model="username" placeholder="Entrez votre pseudo" />
		<router-link :to="{ name: 'tetris-settings', query: { username: username }}">
			<button>Suivant</button>
		</router-link>
	</div>
</template>

<style scoped lang="scss">
</style>