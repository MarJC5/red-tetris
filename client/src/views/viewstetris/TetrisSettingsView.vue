<script lang="ts" setup>
import Settings from '@/components/settingsTetris/Settings.vue'
</script>

<template>
	<div class="settings-tetris">
		<Settings />
		<router-link to="/tetris/username" class="link link--icon"> Back to Username </router-link>
	</div>
</template>

<style scoped lang="scss">
.link {
  margin-top: 20px;
}
</style>