<script lang="ts">
export default {
  name: 'Info'
}
</script>

<script setup lang="ts">

</script>

<template>
  <div class="details-info">
    Info
  </div>
</template>

<style lang="scss" scoped>
.details-info {
  font-family: 'PrimitiveRussian', sans-serif;
  font-size: 20px;
  line-height: 24px;

  @include ui-desktop-only {
    @media (min-width: $desktop) {
      font-size: 30px;
      line-height: 30px;
    }
  }
}
</style>
