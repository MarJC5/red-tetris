<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Screen from '@/components/gameboy/Screen.vue'
import DirectionButton from '@/components/gameboy/DirectionButton.vue'
import ActionButton from '@/components/gameboy/ActionButton.vue'
import Speakers from '@/components/gameboy/Speakers.vue'
import MenuButton from '@/components/gameboy/MenuButton.vue'

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

onMounted(() => {
  updateGameboySize()
  window.addEventListener('resize', updateGameboySize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateGameboySize)
})
</script>

<template>
  <div class="gameboy">
    <div class="gameboy__screen">
      <Screen />
    </div>

    <div class="gameboy__controls">
      <div class="gameboy__controls-top">
        <!-- D-pad section -->
        <div class="gameboy__dpad">
          <DirectionButton class="gameboy__dpad-button gameboy__dpad-button--up"/>
          <DirectionButton class="gameboy__dpad-button gameboy__dpad-button--left"/>
          <DirectionButton class="gameboy__dpad-button gameboy__dpad-button--right"/>
          <DirectionButton class="gameboy__dpad-button gameboy__dpad-button--down"/>
          <div class="gameboy__dpad-center"></div>
        </div>

        <!-- Action buttons section -->
        <div class="gameboy__action-buttons">
          <ActionButton text="A" class="gameboy__action-button gameboy__action-button--a"/>
          <ActionButton text="B" class="gameboy__action-button gameboy__action-button--b"/>
        </div>
      </div>

      <!-- Menu buttons -->
      <div class="gameboy__menu">
        <MenuButton class="gameboy__menu-button gameboy__menu-button--select" text="SELECT"/>
        <MenuButton class="gameboy__menu-button gameboy__menu-button--start" text="START"/>
      </div>
    </div>

    <div class="gameboy__speakers">
      <Speakers />
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

  @media (min-width: 769px) {
    max-width: var(--gameboy-width);
    height: var(--gameboy-height);
    margin: 15vh auto;
    border-radius: 8px 8px 40px 8px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }

  &__controls {
  display: flex;
  flex-direction: column;
  gap: 20px;
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

    &-button {
      position: absolute;
      background-color: var(--gameboy-dpad);
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;

      &:active {
        background-color: var(--gameboy-button-shadow);
        transform: scale(0.95);
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
  flex-direction: column;  // Keep vertical layout
  gap: 15px;              // Space between buttons
  width: 80px;           // Set width to 100px
}

&__action-button {
  &--a {
    display: flex;
    justify-content: flex-end;    // Push A button to the right
  }

  &--b {
    display: flex;
    justify-content: flex-start;  // Keep B button to the left
  }
}

  &__menu {
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 20px;

    // If you need to position it absolutely
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
