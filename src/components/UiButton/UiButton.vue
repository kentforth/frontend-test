<script setup lang="ts">
import loader from "@/assets/loader.gif"

defineEmits(["click"])

interface IProps {
  title: string
  isLoading?: boolean
}

withDefaults(defineProps<IProps>(), {
  title: "",
  isLoading: false,
})
</script>

<template>
  <div
    class="ui-button"
    @click="$emit('click')"
  >
    <img
      v-if="isLoading"
      :src="loader"
      alt="loader"
      class="ui-button__loader"
    />

    <span v-else>{{ title }}</span>
  </div>
</template>

<style scoped lang="scss">
.ui-button {
  background: $blue-2;
  max-width: 100%;
  border-radius: 4px;
  height: 40px;
  color: $white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &__loader {
    width: 30px;
    height: 30px;
    color: $white;
  }
}
</style>
