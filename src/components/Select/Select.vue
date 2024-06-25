<script lang="ts">
export default {
  name: 'Select'
}
</script>

<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  name: String,
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  items: {
    type: Array,
    default: () => []
  }
})

const isVisible = ref(false)

const handleInput = (item) => {
  isVisible.value = false
  emit('update:modelValue', item)
}

defineExpose({isVisible})

</script>

<template>
  <div class="select">
    <div @click="isVisible = true">
      <input type="text" :value="props.modelValue" :placeholder="placeholder" class="select__input" readonly>
    </div>
    <div class="select__list" v-if="isVisible">
      <div class="select__item" v-for="item in items" :key="item" @click="handleInput(item)">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./Select.scss"></style>

<style lang="scss" scoped src="./Select.mobile.scss"></style>
