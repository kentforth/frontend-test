<script setup lang="ts">
import UserListItem from "@/components/UserListItem/UserListItem.vue"
import type { IUser } from "@/types"

const emit = defineEmits(["get-user"])

interface IProps {
  users: Array<IUser>
  isRatingVisible: boolean
}

const { users = [], isRatingVisible = false } = defineProps<IProps>()

const activeUserId = ref<number | null>(null)

const getUser = (user: IUser) => {
  if (activeUserId.value === user.id) return

  activeUserId.value = user.id
  emit("get-user", user)
}
</script>

<template>
  <div class="user-list">
    <UserListItem
      v-for="user in users"
      :key="user.id as number"
      :user="user"
      :active-user-id="activeUserId"
      :is-rating-visible="isRatingVisible"
      @click="getUser(user)"
    />
  </div>
</template>

<style scoped lang="scss">
.user-list {
  display: flex;
  flex-direction: column;
}
</style>
