<script setup lang="ts">
import GameIcon from '@/components/icons/GameIcon.vue';
import AboutIcon from '@/components/icons/AboutIcon.vue';
import LeaderBoardIcon from '@/components/icons/LeaderBoardIcon.vue';
import SettingsIcon from '@/components/icons/SettingsIcon.vue';
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

      <li>
        <router-link to="/leaderboard" class="link link--icon">
          <LeaderBoardIcon />
          Leaderboard
        </router-link>
      </li>

      <li>
        <router-link to="/settings" class="link link--icon">
          <SettingsIcon />
          Settings
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
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }

  li {
    margin: 0;
  }
}
</style>
