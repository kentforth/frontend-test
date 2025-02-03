<script setup lang="ts">
import UserListItem from "@/components/UserListItem/UserListItem.vue"
import type { IUser } from "@/types"

const emit = defineEmits(["get-user"])

interface IProps {
  users: Array<IUser>
  activeUserId: number | null
  isRatingTab: boolean
}

const {
  users = [],
  isRatingTab = false,
  activeUserId = null,
} = defineProps<IProps>()

const getUser = (user: IUser) => {
  if (activeUserId === user.id) return

  emit("get-user", user)
}
</script>

<template>
  <div
    class="user-list"
    :class="activeUserId ? 'user-list--folded' : ''"
  >
    <UserListItem
      v-for="user in users"
      :key="user.id as number"
      :user="user"
      :active-user-id="activeUserId"
      :is-rating-tab="isRatingTab"
      @click="getUser(user)"
    />
  </div>
</template>

<style scoped lang="scss">
.user-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;

  &--folded {
    height: 60%;
  }

  @media (min-width: 601px) {
    overflow-y: inherit;
  }
}
</style>
