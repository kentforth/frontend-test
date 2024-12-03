<script lang="ts">
export default {
  name: 'UiSelect'
}
</script>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import arrow from '@/assets/icons/arrow.png'

const props = defineProps({
  items: {
    type: Array as PropType<string[]>,
    default: () => []
  }
})

const list = ref(null)
const selected = ref(props.items[0])
const isVisible = ref(false)

onClickOutside(list, () => (isVisible.value = false))

const onItemClick = (item: string) => {
  selected.value = item
  isVisible.value = false
}
</script>
<template>
  <div class="select">
    <div class="select__input" @click="isVisible = !isVisible">
      {{ selected }}
      <img :src="arrow" alt="arrow" class="select__arrow" />
    </div>

    <div class="select__list" v-if="isVisible" ref="list">
      <div v-for="item in items" class="select__list-item" @click="onItemClick(item)">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./UiSelect.scss"></style>
