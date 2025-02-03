<script setup lang="ts">
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
    <span>{{ title }}</span>
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
}
</style>
