<script lang="ts">
export default {
  name: 'Checkbox'
}
</script>

<script setup lang="ts">
const emit = defineEmits(['update'])
const isChecked = ref(false)
let currentCheck = 0

const checkboxClass = computed(() => {
  if (isChecked.value) {
    return 'checkbox-checked'
  }

  if (!isChecked.value && currentCheck > 0) {
    return 'checkbox-unchecked'
  }

  return ''
})

const setValue = () => {
  currentCheck += 1
  isChecked.value = !isChecked.value
  emit('update', isChecked.value)
}
</script>

<template>
  <div class="checkbox" @click="setValue">
    <div class="checkbox__circle" :class="checkboxClass">
      <div class="checkbox__circle-inner"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.checkbox {
  width: 90px;
  height: 40px;
  background: $grey-dark;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  cursor: pointer;
  box-shadow: inset 0 2px 9px -2px #000000;

  &__circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: $white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__circle-inner {
    width: 10px;
    height: 10px;
    background: $black;
    border-radius: 50%;
  }

  &-checked {
    transform: translateX(200%);
    transition: 0.2s ease;
  }

  &-unchecked {
    transition: 0.2s ease;
  }
}
</style>
