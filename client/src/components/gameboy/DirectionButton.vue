<script setup lang="ts">
interface Props {
  direction?: 'up' | 'down' | 'left' | 'right';
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'up'
});

const directionIndicator = {
  up: '▲',
  down: '▼',
  left: '◄',
  right: '►'
};
</script>

<template>
  <div :class="['btn-action', `btn-action--${direction}`]">
    <button :class="['direction-btn', `btn-action--${direction}`]">
      <span class="direction-indicator">{{ directionIndicator[direction] }}</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.btn-action {
  width: 25px;
  height: 25px;
  position: relative;

  &.btn-action--up {
    border-radius: 4px 4px 0 0;
  }

  &.btn-action--down {
    border-radius: 0 0 4px 4px;
  }

  &.btn-action--left {
    border-radius: 4px 0 0 4px;
  }

  &.btn-action--right {
    border-radius: 0 4px 4px 0;
  }
}

.direction-btn {
  width: 100%;
  height: 100%;
  background-color: var(--gameboy-dpad);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
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

    .direction-indicator {
      color: var(--gameboy-dpad);
    }
  }
}

.direction-indicator {
  font-size: 20px;
  color: var(--gameboy-button-shadow);
  line-height: 1;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);  // Subtle text shadow
}
</style>