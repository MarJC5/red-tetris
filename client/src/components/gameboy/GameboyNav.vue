<script setup lang="ts">
import GameIcon from '@/components/icons/GameIcon.vue';
import AboutIcon from '@/components/icons/AboutIcon.vue';
</script>

<template>
  <nav class="gameboy-nav">
    <ul>
      <li>
        <router-link to="/tetris" class="link link--icon">
          <GameIcon />
          Tetris
        </router-link>
      </li>
      <li>
        <router-link to="/about" class="link link--icon">
          <AboutIcon />
          About
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.gameboy-nav {
  display: flex;

  ul {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
  }

  li {
    margin: 0;
  }
}
</style>
