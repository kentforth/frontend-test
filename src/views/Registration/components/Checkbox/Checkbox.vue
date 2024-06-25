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

<style lang="scss" scoped src="./Checkbox.scss"></style>

<style lang="scss" scoped src="./Checkbox.mobile.scss"></style>
