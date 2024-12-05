<template>
  <div class="btn-action">
    <button class="direction-btn"></button>
  </div>
</template>

<style lang="scss" scoped>
.btn-action {
  width: 25px;
  height: 25px;
  position: relative;
}

.direction-btn {
  width: 100%;
  height: 100%;
  background-color: var(--gameboy-dpad);
  border: none;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:active {
    background-color: var(--gameboy-button-shadow);
    transform: scale(0.95);
  }

  // For up button
  &.btn-action--up {
    clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
  }

  // For down button
  &.btn-action--down {
    clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
  }

  // For left button
  &.btn-action--left {
    clip-path: polygon(0% 50%, 100% 0%, 100% 100%);
  }

  // For right button
  &.btn-action--right {
    clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
  }
}
</style>