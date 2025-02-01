<script setup lang="ts">
import UserListItem from "@/components/UserListItem/UserListItem.vue"
import type { IUser } from "@/types"

defineEmits(["get-user"])

interface IProps {
  users: Array<IUser>
  activeUserId: number | null
}

const { users = [], activeUserId = null } = defineProps<IProps>()
</script>

<template>
  <div class="user-list">
    <UserListItem
      v-for="user in users"
      :key="user.id as number"
      :user="user"
      :active-user-id="activeUserId"
      @click="$emit('get-user', user)"
    />
  </div>
</template>

<style scoped lang="scss"></style>
