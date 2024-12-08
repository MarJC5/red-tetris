<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings';
import { computed, onMounted, watch } from 'vue';

const settingsStore = useSettingsStore();

// Create a computed ref for `soundEnabled`
const soundEnabled = computed({
  get: () => settingsStore.soundEnabled,
  set: (value: boolean) => settingsStore.toggleSound(value),
});

// Function to update the slider's CSS variable and thumb position
const updateSlider = (value: number) => {
  const sliderElement = document.querySelector('.range-slider');
  if (sliderElement) {
    sliderElement.setAttribute('value', `${value}`); // Ensure slider's native value is synced
    (sliderElement as HTMLElement).style.setProperty('--slider-value', `${value * 100}%`);
  }
};

// Watch for volume changes and update the slider
watch(() => settingsStore.volume, (newValue) => {
  updateSlider(newValue);
});

// Watch for soundEnabled changes and reapply the slider value
watch(() => settingsStore.soundEnabled, (enabled) => {
  if (enabled) {
    updateSlider(settingsStore.volume); // Reapply the volume value to the slider
  }
});

// Set the initial slider value on mount
onMounted(() => {
  updateSlider(settingsStore.volume);
});

</script>

<template>
  <div class="settings">
    <label class="checkbox-label">
      <input type="checkbox" v-model="soundEnabled" class="checkbox-input" />
      <span class="checkbox-custom"></span>
      Enable Sound
    </label>

    <label v-if="soundEnabled" class="range-label">
      Volume:
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        :value="settingsStore.volume"
        @input="settingsStore.setVolume(Number(($event.target as HTMLInputElement).value))"
        class="range-slider"
      />
    </label>
  </div>
</template>


<style scoped>
/* General container styling */
.settings {
  font-family: var(--gameboy-body-font, sans-serif);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Checkbox Styles */
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  position: relative;
}

.checkbox-input {
  display: none; /* Hide the default checkbox */
}

.checkbox-custom {
  width: 20px;
  height: 20px;
  border: 2px solid var(--gameboy-button-shadow);
  background-color: var(--gameboy-body-primary);
  border-radius: 4px;
  position: relative;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  /* Checkmark when checked */
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 6px;
    width: 5px;
    height: 10px;
    border: solid var(--gameboy-text);
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    opacity: 0; /* Hidden by default */
    transition: opacity 0.3s ease;
  }
}

.checkbox-input:checked + .checkbox-custom {
  border-color: var(--gameboy-button-highlight);

  &::after {
    opacity: 1; /* Show the checkmark */
  }
}

/* Range Slider Styles */
.range-label {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.range-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 8px; /* Track height */
  border-radius: 5px; /* Rounded track */
  outline: none;
  cursor: pointer;
  position: relative;

  /* Ensures proper alignment of the thumb */
  display: flex;
  align-items: center;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px; /* Thumb size */
    height: 20px;
    background: var(--gameboy-text); /* Thumb color */
    border: 2px solid var(--gameboy-button-shadow);
    border-radius: 50%;
    cursor: pointer;
    margin-top: -6px; /* Offset to center the thumb */
    transition: transform 0.2s ease;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: var(--gameboy-body-primary);
    border: 2px solid var(--gameboy-button-shadow);
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  &::-webkit-slider-thumb:active,
  &::-moz-range-thumb:active {
    background: var(--gameboy-button-primary);
    transform: scale(1.2); /* Enlarge the thumb when active */
  }

  &::-webkit-slider-runnable-track {
    height: 8px; /* Match track height */
    background: linear-gradient(
      to right,
      var(--gameboy-button-primary) calc(var(--slider-value, 50%)),
      var(--gameboy-body-shadow) 0
    );
    border-radius: 5px;
  }
}


</style>
