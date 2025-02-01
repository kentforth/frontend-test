<script setup lang="ts">
const emit = defineEmits(["click"])

interface IProps {
  textLeft: string | null
  textRight: string | null
}

const { textLeft = null, textRight = null } = defineProps<IProps>()

const activeButton = ref(textLeft)

const setActiveButton = (active: string | null) => {
  activeButton.value = active
  emit("click")
}
</script>

<template>
  <div class="button-switcher">
    <button
      @click="setActiveButton(textLeft)"
      :class="
        activeButton === textLeft ? 'button-switcher__button--active' : ''
      "
      class="button-switcher__button"
    >
      {{ textLeft }}
    </button>
    <button
      @click="setActiveButton(textRight)"
      :class="
        activeButton === textRight ? 'button-switcher__button--active' : ''
      "
      class="button-switcher__button"
    >
      {{ textRight }}
    </button>
  </div>
</template>
\

<style scoped lang="scss" src="./ButtonSwitcher.scss" />
