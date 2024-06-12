<script lang="ts">
export default {
  name: 'Content'
}
</script>

<script setup lang="ts">

</script>

<template>
  <div class="heritage-item-content">
    <slot/>
  </div>
</template>

<style lang="scss">
.heritage-item-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;

  p {
    font-size: 20px;
    color: $white-grey;
  }
}
</style>
