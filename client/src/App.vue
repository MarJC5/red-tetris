<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted, onUnmounted, computed } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import Screen from '@/components/gameboy/Screen.vue'
import DirectionButton from '@/components/gameboy/DirectionButton.vue'
import ActionButton from '@/components/gameboy/ActionButton.vue'
import Speakers from '@/components/gameboy/Speakers.vue'
import MenuButton from '@/components/gameboy/MenuButton.vue'
import { useRoute } from 'vue-router';

const settingsStore = useSettingsStore()
const route = useRoute()
const currentRouteName = computed(() => route.name)

// Create a function to handle resize
const updateGameboySize = () => {
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight
  const BASE_WIDTH = 375
  const BASE_HEIGHT = 667

  // Set dimensions based on screen size
  const gameboyWidth = screenWidth <= 768 ? screenWidth : BASE_WIDTH
  const gameboyHeight = screenWidth <= 768 ? screenHeight : BASE_HEIGHT

  // Update CSS vars
  document.documentElement.style.setProperty(
    '--gameboy-width',
    `${gameboyWidth}px`,
  )
  document.documentElement.style.setProperty(
    '--gameboy-height',
    `${gameboyHeight}px`,
  )
}

const handleLinkClick = (event: Event) => {
  const target = event.target as HTMLElement
  if (target.tagName === 'A') {
    settingsStore.playSound('confirm')
  }
}

onMounted(() => {
  updateGameboySize()
  document.addEventListener('click', handleLinkClick)
  window.addEventListener('resize', updateGameboySize)
})

onUnmounted(() => {
  document.removeEventListener('click', handleLinkClick)
  window.removeEventListener('resize', updateGameboySize)
})
</script>

<template>
  <div :class="['gameboy', { 'gameboy--tetris': currentRouteName === 'tetris', 'gameboy--view': currentRouteName !== 'tetris'}]">
    <div class="gameboy__screen">
      <Screen>
        <RouterView />
      </Screen>
    </div>

    <div class="gameboy__controls">
      <div class="gameboy__controls-top">
        <!-- D-pad section -->
        <div class="gameboy__dpad">
          <DirectionButton
            direction="up"
            class="gameboy__dpad-button gameboy__dpad-button--up"
          />
          <DirectionButton
            direction="left"
            class="gameboy__dpad-button gameboy__dpad-button--left"
          />
          <DirectionButton
            direction="right"
            class="gameboy__dpad-button gameboy__dpad-button--right"
          />
          <DirectionButton
            direction="down"
            class="gameboy__dpad-button gameboy__dpad-button--down"
          />
          <div class="gameboy__dpad-center">
            <span> &#9679; </span>
          </div>
        </div>

        <!-- Action buttons section -->
        <div class="gameboy__action-buttons">
          <ActionButton
            text="A"
            class="gameboy__action-button gameboy__action-button--a"
          />
          <ActionButton
            text="B"
            class="gameboy__action-button gameboy__action-button--b"
          />
        </div>
      </div>

      <!-- Menu buttons -->
      <div class="gameboy__menu">
        <MenuButton
          class="gameboy__menu-button gameboy__menu-button--select"
          text="SELECT"
        />
        <MenuButton
          class="gameboy__menu-button gameboy__menu-button--start"
          text="START"
        />

        <Speakers />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gameboy {
  background-color: var(--gameboy-body-primary);
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: relative; // For the overlay
  perspective: 1000px; // Perspective for 3D effect

  // Grainy overlay
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.4; // Increased opacity
    mix-blend-mode: soft-light; // Changed blend mode for more visible effect
    pointer-events: none;
  }

  @media (min-width: 769px) {
    max-width: var(--gameboy-width);
    height: var(--gameboy-height);
    margin: 15vh auto;
    border-radius: 8px 8px 40px 40px;
    box-shadow: 
      // Subtle outer shadow
      0 8px 24px rgba(0, 0, 0, 0.2),
      // Very subtle inner shadow at the top
      inset 0 2px 2px var(--gameboy-body-highlight);

    // Grainy overlay
    &::before {
      border-radius: 8px 8px 40px 40px;
    }
  }

  &__controls {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 50px;
    padding: 15px;
    position: relative;
  }

  &__controls-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  &__dpad {
    position: relative;
    width: 100px;
    height: 100px;

    &-center {
      box-shadow:
        inset -1px -1px 2px rgba(0, 0, 0, 0.3),
        // Inner shadow for depth
        inset 1px 1px 2px rgba(255, 255, 255, 0.1),
        // Subtle highlight
        0 1px 2px rgba(0, 0, 0, 0.2); // Outer shadow for lift
      span {
        color: var(--gameboy-button-shadow);
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 20px;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
      }
    }

    &-button {
      position: absolute;
      background-color: var(--gameboy-dpad);
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;

      &:active {
        background-color: var(--gameboy-button-shadow);
        //transform: scale(0.95);
      }

      &--up,
      &--down {
        width: 30px;
        height: 35px;
        left: 35px;
      }

      &--up {
        top: 0;
      }

      &--down {
        bottom: 0;
      }

      &--left,
      &--right {
        width: 35px;
        height: 30px;
        top: 35px;
      }

      &--left {
        left: 0;
      }

      &--right {
        right: 0;
      }
    }

    &-center {
      position: absolute;
      width: 30px;
      height: 30px;
      background-color: var(--gameboy-dpad);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &__action-buttons {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 80px;
  }

  &__action-button {
    &--a {
      display: flex;
      justify-content: flex-end;
    }

    &--b {
      display: flex;
      justify-content: flex-start;
    }
  }

  &__menu {
    position: relative;
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 20px;
  }
}
</style>
