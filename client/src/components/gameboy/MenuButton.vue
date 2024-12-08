<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useSettingsStore } from '@/stores/settings';
import { defineProps, defineEmits, withDefaults } from 'vue';
import { useRouter } from 'vue-router'

interface Props {
  text?: string;  // For SELECT or START text
}

const props = withDefaults(defineProps<Props>(), {
  text: 'SELECT'
});

const emit = defineEmits(['buttonDown', 'buttonUp']);

const isActive = ref(false);

// Use the router
const router = useRouter();

// Use the settings store
const settingsStore = useSettingsStore();

// Key mapping for menu buttons
const keyMap: { [key: string]: string } = {
  s: 'START',    // Enter key for Start
  S: 'START',    // Shift + Enter key for Start
  x: 'SELECT',   // x key for Select
  X: 'SELECT'    // Shift + x key for Select
};

const handleButtonDown = () => {
  isActive.value = true;
  emit('buttonDown', props.text);
  // Play sound on button down
  settingsStore.playSound('click');

  // SELECT navigate to home
  if (props.text === 'SELECT') {
    router.push('/');
  }

  // START navigate to tetris
  if (props.text === 'START') {
      router.push('/tetris');
    }
};

const handleButtonUp = () => {
  isActive.value = false;
  emit('buttonUp', props.text);
};

const handleKeydown = (event: KeyboardEvent) => {
  const pressedButton = keyMap[event.key];
  if (pressedButton === props.text && !event.repeat) {
    isActive.value = true;
    emit('buttonDown', props.text);
    // Play sound on button down
    settingsStore.playSound('click');

    // SELECT navigate to home
    if (props.text === 'SELECT') {
      router.push('/');
    }

    // START navigate to tetris
    if (props.text === 'START') {
      router.push('/tetris');
    }
  }
};

const handleKeyup = (event: KeyboardEvent) => {
  const pressedButton = keyMap[event.key];
  if (pressedButton === props.text) {
    isActive.value = false;
    emit('buttonUp', props.text);
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
  <div class="gameboy__menu-button">
    <button 
      class="menu-button"
      :class="{ 'active': isActive }"
      @mousedown="handleButtonDown"
      @mouseup="handleButtonUp"
      @mouseleave="handleButtonUp"
      @touchstart.prevent="handleButtonDown"
      @touchend.prevent="handleButtonUp"
    ></button>
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

  &.active,
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