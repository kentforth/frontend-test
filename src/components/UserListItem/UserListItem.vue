<script setup lang="ts">
import arrow from "@/assets/icons/chevron-right.svg"
import type { IUser } from "@/types"
const emit = defineEmits(["click"])

interface IProps {
  user: IUser
  activeUserId: number | null
}

const {
  user = {
    id: null,
    name: "",
    avatar: "",
    alt: "",
  },
  activeUserId = null,
} = defineProps<IProps>()

const isMenuVisible = ref(false)

const onClick = () => {
  emit("click")
  isMenuVisible.value = !isMenuVisible.value
}
</script>

<template>
  <div
    class="user-list-item"
    :class="activeUserId === user.id ? 'user-list-item--active' : ''"
    @click="onClick"
  >
    <div class="user-list-item__user">
      <div class="user-list-item__image">
        <img
          src="https://images.generated.photos/VEFNRr8_f-ZbZSGTxh5Cf8VLGOb1b2ts9UoF-Rlzeh4/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTI0MDk2LmpwZw.jpg"
          alt="user"
        />
      </div>
      <p>{{ user.name }}</p>
    </div>

    <img
      :src="arrow"
      alt="arrow"
      class="user-list-item__icon"
      :class="isMenuVisible ? 'user-list-item__icon--active' : ''"
    />
  </div>
</template>

<style scoped lang="scss" src="./UserListItem.scss" />
