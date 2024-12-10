<script lang="ts" setup>
import SoundEffects from '@/components/settings/SoundEffects.vue'
import ThemeSelector from '@/components/settings/ThemeSelector.vue'
</script>

<template>
  <div class="settings">
    <h1>Settings</h1>

    <ThemeSelector />

    <SoundEffects />

    <router-link to="/" class="link link--icon"> Back to Home </router-link>
  </div>
</template>

<style scoped lang="scss">
.link {
  margin-top: 20px;
}
</style>
