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
    inset -1px -1px 2px rgba(0, 0, 0, 0.3),    // Inner shadow for depth
    inset 1px 1px 2px rgba(255, 255, 255, 0.1), // Subtle highlight
    0 1px 2px rgba(0, 0, 0, 0.2);              // Outer shadow for lift

  &:active {
    background-color: var(--gameboy-button-shadow);
    transform: scale(0.95);
    box-shadow: 
      inset 1px 1px 3px rgba(0, 0, 0, 0.4),     // Deeper inner shadow when pressed
      inset -1px -1px 2px rgba(0, 0, 0, 0.2);   // Slight outer shadow when pressed
  }
}

.menu-label {
  font-size: 10px;
  font-weight: bold;
  color: var(--gameboy-button-shadow);
  line-height: 1;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
  user-select: none;
}
</style>