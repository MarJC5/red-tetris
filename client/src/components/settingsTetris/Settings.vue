<script lang="ts" setup>
	import { computed } from 'vue' 
	import { useRoute } from 'vue-router'

	const route = useRoute() 
	const username = computed(() => route.query.username as string)
</script>

<template>
	<div class="settingSelector">
		<h2>Choisissez vos paramètres</h2>
		<router-link :to="{ name: 'tetris-game', params: { username: username }}"> 
			<button type="submit">Crée la room</button> 
		</router-link>
	</div>
</template>

<style scoped lang="scss">
</style>