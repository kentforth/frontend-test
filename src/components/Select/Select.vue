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

<style lang="scss" scoped>
.select {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 999999;

  &__input {
    cursor: pointer;
    width: 100%;
    height: 70px;
  }

  &__list {
    width: 100%;
    box-shadow: 0 8px 10px -4px rgba(0, 0, 0, 0.68);
    font-size: 24px;
    position: absolute;
    top: 100%;
    left: 0;
    background: $black;
  }

  &__item {
    width: 100%;
    padding: 10px 20px;
    cursor: pointer;
    color: $white-grey;

    &:hover {
      background: $brown;
    }
  }
}
</style>
