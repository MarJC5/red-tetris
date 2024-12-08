<script setup lang="ts">
import { ref, defineProps, withDefaults, defineEmits, onMounted, onUnmounted } from 'vue';
import { useSettingsStore } from '@/stores/settings'; 

interface Props {
  direction?: 'up' | 'down' | 'left' | 'right';
  onClick?: (direction: string) => void;
}

const isActive = ref(false);

// Use the settings store
const settingsStore = useSettingsStore();

const props = withDefaults(defineProps<Props>(), {
  direction: 'up'
});

const directionIndicator = {
  up: '▲',
  down: '▼',
  left: '◄',
  right: '►'
};

const emit = defineEmits(['buttonDown', 'buttonUp', 'click']);

// Handle mouse/touch events
const handleButtonDown = () => {
  isActive.value = true;
  emit('buttonDown', props.direction);
  // Play sound on button down
  settingsStore.playSound('click');
};

const handleButtonUp = () => {
  isActive.value = false;
  emit('buttonUp', props.direction);
};

// Key mapping for direction buttons (arrow keys)
const keyMap: { [key: string]: 'up' | 'down' | 'left' | 'right' } = {
  arrowup: 'up',
  arrowdown: 'down',
  arrowleft: 'left',
  arrowright: 'right'
};

// Handle keyboard events
const handleKeydown = (event: KeyboardEvent) => {
  const pressedDirection = keyMap[event.key.toLowerCase()];
  if (pressedDirection === props.direction && !event.repeat) {
    isActive.value = true;
    emit('buttonDown', props.direction);
    // Play sound on button down
    settingsStore.playSound('click');
  }
};

const handleKeyup = (event: KeyboardEvent) => {
  const pressedDirection = keyMap[event.key.toLowerCase()];
  if (pressedDirection === props.direction) {
    isActive.value = false;
    emit('buttonUp', props.direction);
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('keyup', handleKeyup);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('keyup', handleKeyup);
});
</script>

<template>
  <div :class="['btn-action', `btn-action--${direction}`]">
    <button 
      :class="['direction-btn', `btn-action--${direction}`, { 'active': isActive }]"
      :aria-label="`Direction button ${direction}`"
      @mousedown="handleButtonDown"
      @mouseup="handleButtonUp"
      @mouseleave="handleButtonUp"
      @touchstart.prevent="handleButtonDown"
      @touchend.prevent="handleButtonUp"
    >
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

  &.active,
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