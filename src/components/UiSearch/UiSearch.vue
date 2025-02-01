<script setup lang="ts">
import search from "@/assets/icons/search.svg"

defineEmits(["search"])
</script>

<template>
  <div class="ui-search">
    <input
      type="text"
      placeholder="Enter username to search"
      class="ui-search__input"
      @input="$emit('search', ($event.target as HTMLInputElement).value)"
    />

    <img
      :src="search"
      alt=""
    />
  </div>
</template>

<style scoped lang="scss" src="./UiSearch.scss" />
