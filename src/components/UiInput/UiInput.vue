<script lang="ts">
export default {
  name: 'UiInput'
}
</script>

<script setup lang="ts">
import eye from '@/assets/icons/eye.png'

defineProps({
  type: {
    type: String,
    default: 'input'
  },
  maxLength: {
    type: Number,
    default: 100
  }
})
</script>

<template>
  <input v-if="type === 'input'" class="input" :maxlength="maxLength" />

  <div v-else class="input-password">
    <input :maxlength="maxLength" />
    <img :src="eye" alt="eye" />
  </div>
</template>

<style lang="scss" scoped src="./UiInput.scss"></style>
