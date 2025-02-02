<script setup lang="ts">
defineEmits(["decrease", "increase"])

interface IProps {
  rating: number
}

withDefaults(defineProps<IProps>(), {
  rating: 0,
})
</script>

<template>
  <div class="counter">
    <button @click="$emit('decrease')">-</button>
    <span>{{ rating }} points</span>
    <button @click="$emit('increase')">+</button>
  </div>
</template>

<style scoped lang="scss">
.counter {
  padding: 1px;
  width: 100%;
  background: $grey;
  height: 30px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    width: 30px;
    height: 100%;
    border-radius: 4px;
    box-shadow:
      rgba(14, 30, 37, 0.12) 0 2px 4px 0,
      rgba(14, 30, 37, 0.32) 0 2px 8px 0;
  }
}
</style>
