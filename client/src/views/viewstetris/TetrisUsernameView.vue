<script lang="ts" setup>
import Username from '@/components/settingsTetris/Username.vue'
</script>

<template>
	<div class="usernameTetris">
		<Username />
		<router-link to="/" class="link link--icon"> Back to Home </router-link>
	</div>
</template>

<style scoped lang="scss">
.link {
  margin-top: 20px;
}
</style>