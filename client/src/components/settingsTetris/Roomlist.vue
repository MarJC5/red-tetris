<script setup lang="ts">
	import { ref } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute() 
	const username = ref(route.query.username as string)
</script>

<template>
	<div class="username-selector">
		<h2>Choose a room</h2>
	</div>
</template>

<style scoped lang="scss">
</style>