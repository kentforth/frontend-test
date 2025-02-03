<script setup lang="ts">
import search from "@/assets/icons/search.svg"
import { useDebounce } from "@/composables/shared"

const emit = defineEmits(["search"])

const model = defineModel()

defineProps({
  isLoading: Boolean,
})

const searchUser = useDebounce(() => {
  emit("search", model.value)
}, 200)
</script>

<template>
  <div class="ui-search">
    <input
      type="text"
      v-model.trim="model"
      placeholder="Enter username to search"
      class="ui-search__input"
      @input="searchUser"
    />

    <img
      :src="search"
      alt=""
    />
  </div>
</template>

<style scoped lang="scss" src="./UiSearch.scss" />
