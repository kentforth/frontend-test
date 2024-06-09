<script lang="ts">
export default {
  name: 'GetThere'
}
</script>

<script setup lang="ts">

</script>

<template>
  <div class="details-get-there">
    GetThere
  </div>
</template>

<style lang="scss" scoped>
.details-get-there {
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
