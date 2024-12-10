<script>
  export default {
	name: 'UsernameView',
	data() {
	  return {
		username: ''
	  }
	},
	methods: {
	  goToSettings() {
		this.$router.push({ name: 'tetris-settings' })
	  }
	}
  }
</script>

<template>
	<div>
	  <h1>Choisissez votre pseudo</h1>
	  <input v-model="username" placeholder="Entrez votre pseudo" />
	  <button @click="goToSettings">Suivant</button>
	</div>
</template>  