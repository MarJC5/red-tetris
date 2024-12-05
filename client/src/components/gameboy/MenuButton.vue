<script setup lang="ts">
interface Props {
  text?: string;  // For SELECT or START text
}

const props = withDefaults(defineProps<Props>(), {
  text: 'SELECT'
});
</script>

<template>
  <div class="gameboy__menu-button">
    <button class="menu-button"></button>
    <span class="menu-label">{{ text }}</span>
  </div>
</template>

<style lang="scss" scoped>
.gameboy__menu-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.menu-button {
  width: 40px;
  height: 12px;
  background-color: var(--gameboy-dpad);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 
    inset -1px -1px 2px var(--gameboy-button-shadow),
    inset 1px 1px 2px var(--gameboy-body-highlight);

  &:active {
    background-color: var(--gameboy-button-shadow);
    transform: scale(0.95);
    box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.3);
  }
}

.menu-label {
  font-size: 10px;
  font-weight: bold;
  color: var(--gameboy-text);
  text-shadow: 1px 1px 1px var(--gameboy-text-shadow);
  text-transform: uppercase;
}
</style>