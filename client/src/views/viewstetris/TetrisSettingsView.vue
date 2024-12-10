<script>
  export default {
	name: 'SettingsView',
	methods: {
	  goToGame() {
		this.$router.push({ name: 'tetris-game' })
	  }
	}
  }
</script>

<template>
	<div>
	  <h1>Choisissez vos paramètres</h1>
	  <form @submit.prevent="goToGame">
		<!-- Ajoute ici les paramètres du jeu -->
		<button type="submit">Commencer à jouer</button>
	  </form>
	</div>
</template>  