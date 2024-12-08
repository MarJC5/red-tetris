<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings';

const settingsStore = useSettingsStore();

const handleThemeChange = (event: Event) => {
  const theme = (event.target as HTMLSelectElement).value;
  settingsStore.switchTheme(theme);
};
</script>

<template>
  <div class="theme-selector">
    <label for="theme-select">Choose Theme:</label>
    <select id="theme-select" @change="handleThemeChange">
      <option
        v-for="theme in settingsStore.themes"
        :key="theme"
        :value="theme"
        :selected="theme === settingsStore.currentTheme"
      >
        {{ theme }}
      </option>
    </select>
  </div>
</template>

<style scoped lang="scss">
.theme-selector {
  padding: 20px 0;
  label {
  margin-right: 10px;
  font-family: var(--gameboy-body-font);
}

select {
  font-family: var(--gameboy-body-font);
  font-size: 10px;
  padding: 4px;
  width: 100%;
  background-color: var(--gameboy-body-primary);
  border: 2px solid var(--gameboy-button-shadow);
  color: var(--gameboy-text);
  border-radius: var(--radius-sm);
}
}
</style>
