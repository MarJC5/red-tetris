<template>
  <div class="speakers">
    <div class="speakers__grille">
      <div 
        v-for="(dot, index) in speakerPattern" 
        :key="index"
        :class="['dot', dot]"
      ></div>
    </div>
  </div>
</template>

<script setup>
const generateSpeakerPattern = () => {
  const rowPatterns = {
    edge: ['placeholder', 'open', 'closed', 'open', 'closed', 'open', 'closed', 'placeholder'],
    full: ['open', 'closed', 'open', 'closed', 'open', 'closed', 'open', 'closed'],
    fullAlt: ['closed', 'open', 'closed', 'open', 'closed', 'open', 'closed', 'open']
  };

  const rowSequence = [
    'edge',
    'full',
    'fullAlt',
    'full',
    'fullAlt',
    'full',
    'fullAlt',
    'edge'
  ];

  return rowSequence.flatMap(rowType => rowPatterns[rowType]);
};

const speakerPattern = generateSpeakerPattern();
</script>

<style lang="scss" scoped>
.speakers {
  position: absolute;
  top: 0;
  right: -25px;
  display: flex;
  justify-content: flex-end;
  padding: 20px;

  &__grille {
    width: 75px;
    height: 75px;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 2px;
    transform: skewY(-10deg);
  }
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;

  &.placeholder {
    background-color: transparent;
  }

  &.open {
    background-color: var(--gameboy-dpad);
    opacity: 0.6;
  }

  &.closed {
    background-color: var(--gameboy-dpad);
    opacity: 0.9;
  }
}
</style>