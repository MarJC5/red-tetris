<script setup lang="ts">
interface Props {
  text?: string;         // For A or B label
  rotate?: number;       // For button rotation if needed
  onClick?: () => void;  // For click handler
}

// Define props with defaults
const props = withDefaults(defineProps<Props>(), {
  text: 'A',
  rotate: 0,
  onClick: () => {}
});

// Emit events
const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click');
  props.onClick();
};
</script>

<template>
  <div 
    class="btn-action"
    :style="{ transform: `rotate(${rotate}deg)` }"
  >
    <button 
      class="action-btn"
      @click="handleClick"
      :aria-label="`${text} button`"
    >

    <span class="btn-label">{{ text }}</span>
  </button>
  </div>
</template>

<style lang="scss" scoped>

.action-btn {
  width: 40px;
  height: 40px;
  background-color: var(--gameboy-button-primary);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 
    inset -2px -2px 4px var(--gameboy-button-shadow),
    inset 2px 2px 4px var(--gameboy-body-highlight);

  &:active {
    background-color: var(--gameboy-button-shadow);
    transform: scale(0.95);
    box-shadow: 
      inset 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
}

.btn-label {
  font-size: 12px;
  font-weight: bold;
  color: var(--gameboy-text);
  text-shadow: 1px 1px 1px var(--gameboy-text-shadow);
}
</style>