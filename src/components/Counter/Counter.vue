<script setup lang="ts"></script>

<template>
  <div class="counter">
    <button>+</button>
    <span>5 points</span>
    <button>-</button>
  </div>
</template>

<style scoped lang="scss">
.counter {
  width: 100%;
  background: $grey;
  height: 30px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
