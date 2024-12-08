<script lang="ts" setup>
import HouseIcon from '@/components/icons/HouseIcon.vue';
import ThemeSelector from '@/components/ThemeSelector.vue';
</script>

<template>
  <div class="settings">
    <h1>Settings</h1>

    <ThemeSelector />
   
    <router-link to="/" class="link link--icon">
      Back to Home
    </router-link>
  </div>
</template>

<style scoped lang="scss">

</style>
