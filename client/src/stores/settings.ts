import { ref, watch, onMounted } from 'vue';
import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', () => {
  // Current theme
  const currentTheme = ref('default');

  // Available themes
  const themes = [
    'default',
    'theme-atomic-purple',
    'theme-teal',
    'theme-clear-blue',
  ];

  // Load theme from localStorage or fallback to default
  function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themes.includes(savedTheme)) {
      currentTheme.value = savedTheme;
    } else {
      currentTheme.value = 'default';
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

  // Watch for theme changes and apply them dynamically
  watch(currentTheme, updateTheme);

  return {
    currentTheme,
    themes,
    switchTheme,
    loadTheme,
  };
});
