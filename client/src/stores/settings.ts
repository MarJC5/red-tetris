import { ref, watch, onMounted } from 'vue';
import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', () => {
  // Current theme
  const currentTheme = ref('default');

  // Available themes
  const themes = ['default', 'theme-atomic-purple', 'theme-teal', 'theme-clear-blue'];

  // Sound settings
  const soundEnabled = ref(true); // Whether sound is enabled
  const volume = ref(1); // Volume (0.0 to 1.0)
  const soundEffects = {
    click: new Audio('/sounds/click.wav'),
    error: new Audio('/sounds/cancel.wav'),
  };

  // Load preferences from localStorage
  function loadPreferences() {
    const savedTheme = localStorage.getItem('theme');
    const savedSoundEnabled = localStorage.getItem('soundEnabled');
    const savedVolume = localStorage.getItem('volume');

    if (savedTheme && themes.includes(savedTheme)) {
      currentTheme.value = savedTheme;
    } else {
      currentTheme.value = 'default';
    }

    if (savedSoundEnabled !== null) {
      soundEnabled.value = savedSoundEnabled === 'true';
    }

    if (savedVolume !== null) {
      volume.value = parseFloat(savedVolume);
    }

    updateTheme();
  }

  // Switch theme
  function switchTheme(theme: string) {
    if (themes.includes(theme)) {
      currentTheme.value = theme;
      localStorage.setItem('theme', theme); // Save to localStorage
      updateTheme();
    } else {
      console.warn(`Theme "${theme}" is not available.`);
    }
  }

  // Update the theme on the document body
  function updateTheme() {
    document.body.className = currentTheme.value;
  }

  // Play a sound effect
  function playSound(effect: keyof typeof soundEffects) {
    if (soundEnabled.value && soundEffects[effect]) {
      const sound = soundEffects[effect];
      sound.volume = volume.value;
      sound.currentTime = 0; // Reset sound to start
      sound.play();
    }
  }

  // Toggle sound
  function toggleSound(value?: boolean) {
    soundEnabled.value = !soundEnabled.value;
    localStorage.setItem('soundEnabled', soundEnabled.value.toString());
  }

  // Set volume
  function setVolume(newVolume: number) {
    if (newVolume >= 0 && newVolume <= 1) {
      volume.value = newVolume;
      localStorage.setItem('volume', newVolume.toString());
    } else {
      console.warn('Volume must be between 0.0 and 1.0');
    }
  }

  // Watch for theme and sound preference changes
  watch(currentTheme, updateTheme);

  // Load preferences on initialization
  onMounted(() => {
    loadPreferences();
  });

  return {
    currentTheme,
    themes,
    switchTheme,
    loadTheme: loadPreferences,
    soundEnabled,
    volume,
    toggleSound,
    setVolume,
    playSound,
  };
});
