<script lang="ts" setup>
	import { ref } from 'vue' 
	
	const username = ref('YourUsername')
</script>

<template>
	<div class="username-selector">
		<h2>Choose Username</h2>
		<input v-model="username" placeholder="Entrez votre pseudo" />
		<router-link class="link link--icon" :to="{ name: 'tetris-settings', query: { username: username }}">
			Next
		</router-link>
	</div>
</template>

<style scoped lang="scss">
	.username-selector {
		padding: 20px 0;
		h2 {
			margin-right: 10px;
			font-family: var(--gameboy-body-font);
		}

		input {
			margin-top: 20px;
			font-family: var(--gameboy-body-font);
			font-size: 10px;
			padding: 4px;
			width: 100%;
			background-color: var(--gameboy-body-primary);
			border: 2px solid var(--gameboy-button-shadow);
			color: var(--gameboy-text);
			border-radius: var(--radius-sm);
		}

		.link {
			margin-top: 20px;
		}
	}
</style>