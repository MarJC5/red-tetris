<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useSettingsStore } from '@/stores/settings'; 

interface Props {
  text?: string;
  rotate?: number;
  onClick?: () => void;
}

const props = withDefaults(defineProps<Props>(), {
  text: 'A',
  rotate: 0,
  onClick: () => {}
});

const emit = defineEmits(['buttonDown', 'buttonUp', 'click']);

const isActive = ref(false);

// Use the settings store
const settingsStore = useSettingsStore();

// Updated key mapping to use actual A and B keys
const keyMap: { [key: string]: string } = {
  a: 'A',
  A: 'A',
  b: 'B',
  B: 'B'
};

const handleButtonDown = () => {
  isActive.value = true;
  emit('buttonDown', props.text);
  // Play sound on button down
  settingsStore.playSound('click');

  // B button to go back
  if (props.text === 'B') {
    window.history.back();
  }

  // A button to go forward
  if (props.text === 'A') {
    window.history.forward();
  }
};

const handleButtonUp = () => {
  isActive.value = false;
  emit('buttonUp', props.text);
  emit('click');
  props.onClick?.();
};

const handleKeydown = (event: KeyboardEvent) => {
  const pressedButton = keyMap[event.key];
  if (pressedButton === props.text && !event.repeat) {
    isActive.value = true;
    emit('buttonDown', props.text);
    // Play sound on button down
    settingsStore.playSound('click');

    // B button to go back
    if (props.text === 'B') {
      window.history.back();
    }

    // A button to go forward
    if (props.text === 'A') {
      window.history.forward();
    }
  }
};

const handleKeyup = (event: KeyboardEvent) => {
  const pressedButton = keyMap[event.key];
  if (pressedButton === props.text) {
    isActive.value = false;
    emit('buttonUp', props.text);
    emit('click');
    props.onClick?.();
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
  <div 
    class="btn-action"
    :style="{ transform: `rotate(${rotate}deg)` }"
  >
    <button 
      :class="{ 'action-btn': true, active: isActive }"
      :aria-label="`${text} button`"
      @mousedown="handleButtonDown"
      @mouseup="handleButtonUp"
      @mouseleave="handleButtonUp"
      @touchstart.prevent="handleButtonDown"
      @touchend.prevent="handleButtonUp"
    >
      <span class="btn-label">{{ text }}</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.action-btn {
  width: 40px;
  height: 40px;
  background-color: var(--gameboy-dpad);
  border: none;
  border-radius: 50%;
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

    .btn-label {
      color: var(--gameboy-dpad);
    }
  }
}

.btn-label {
  font-size: 20px;
  color: var(--gameboy-button-shadow);
  line-height: 1;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
}
</style>