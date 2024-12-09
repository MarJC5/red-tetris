<script setup lang="ts">
import GameBoyLogo from '@/components/icons/GameBoyLogo.vue';
import PowerIndicator from '@/components/gameboy/PowerIndicator.vue';
</script>

<template>
  <div class="screen">
    <div class="screen__frame">
      <!-- Power indicator -->
      <div class="screen__power">
        <div class="screen__power-led">
          <PowerIndicator /> <span>)))</span>
        </div>
        <div class="screen__power-text">POWER</div>
      </div>

      <!-- Main display area -->
      <div class="screen__display">
        <slot />
      </div>

      <!-- Game Boy text -->
      <div class="screen__brand">
        <GameBoyLogo />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.screen {
  width: 100%;

  &__frame {
    background-color: #232323;
    border-radius: var(--radius-md) var(--radius-md) 0 0;
    padding: 40px 30px 25px;
    position: relative;

    // Add subtle edge effect
    &::after {
      content: "";
      display: block;
      position: absolute;
      bottom: -15px;
      left: 0;
      width: 100%;
      height: 30px;
      border-radius: 50%;
      background-color: #232323;
    }
  }

  &__power {
    position: absolute;
    top: 30%;
    left: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    transform: translateY(-30%);
  }

  &__power-led {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #666;

    span {
      font-size: 10px;
      font-weight: bold;
    }
  }

  &__power-text {
    color: #666;
    font-size: 7px;
    font-weight: bold;
  }

  &__display {
    width: 85%;
    max-width: 85%;
    aspect-ratio: 1/1;
    background-color: var(--gameboy-screen-pixels);
    margin: 0 auto 15px auto;
    border: 4px solid #111;
    font-family: var(--gameboy-body-font);
    font-size: 10px;
    color: var(--gameboy-text);
    overflow-y: auto;
    border-radius: 3px;
  }

  &__brand {
    display: flex;
    justify-content: center;
  }
}

.gameboy {
  &--view {
    .screen {
      &__display {
      padding: 10px;
      }
    }
  }
}
</style>