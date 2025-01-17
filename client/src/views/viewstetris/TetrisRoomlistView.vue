<script lang="ts" setup>
import Roomlist from '@/components/settingsTetris/Roomlist.vue'
</script>

<template>
	<div class="roomlist-tetris">
		<Roomlist />
		<router-link to="/tetris/username" class="link link--icon"> Back to Username </router-link>
	</div>
</template>

<style scoped lang="scss">
.link {
  margin-top: 20px;
}
</style>