<script setup lang="ts">
import arrow from "@/assets/icons/chevron-right.svg"
import type { IUser } from "@/types"
const emit = defineEmits(["click"])

interface IProps {
  user: IUser
  activeUserId: number | null
  isRatingTab: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  user: {
    id: null,
    first_name: null,
    last_name: null,
    email: null,
    avatar: "",
    alt: "",
    rating: 0,
  },
  isRatingTab: false,
  activeUserId: null,
})

const isMenuVisible = ref(false)

const activeItem = computed(() => {
  return props.activeUserId === props.user.id ? "user-list-item--active" : ""
})

const onClick = () => {
  emit("click")
  isMenuVisible.value = !isMenuVisible.value
}
</script>

<template>
  <div
    class="user-list-item"
    :class="activeItem"
    @click="onClick"
  >
    <div class="user-list-item__user">
      <div class="user-list-item__image">
        <div
          v-if="isRatingTab"
          class="user-list-item__rating"
        >
          {{ user.rating }}
        </div>
        <img
          v-else
          :src="user.avatar"
          alt="user"
        />
      </div>
      <p>{{ user.first_name }} {{ user.last_name }}</p>
    </div>

    <img
      :src="arrow"
      alt="arrow"
      class="user-list-item__icon"
    />
  </div>
</template>

<style scoped lang="scss" src="./UserListItem.scss" />
