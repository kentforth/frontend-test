<script setup lang="ts">
import UiSearch from "@/components/UiSearch/UiSearch.vue"
import type { IUser } from "@/types"

const emit = defineEmits([
  "get-user",
  "set-active-tab",
  "search-user",
  "update-users",
])

interface IProps {
  users: Array<IUser>
  error: string | unknown | null
  isRatingTab: boolean
  activeUserId: number | null
}

const {
  users = [],
  error = "",
  isRatingTab = false,
  activeUserId = null,
} = defineProps<IProps>()

const setActiveTab = (tab: string) => {
  emit("set-active-tab", tab)
}

const searchUser = (user: string) => {
  emit("search-user", user)
}
</script>

<template>
  <div class="sidebar">
    <div class="sidebar__header">
      <ButtonSwitcher
        text-left="Clients"
        text-right="Rating"
        @click="setActiveTab"
      />

      <UiSearch
        class="sidebar__search"
        @search="searchUser"
      />
    </div>

    <p
      v-if="error"
      class="sidebar__error"
    >
      {{ error }}
    </p>

    <UserList
      :users="users"
      :active-user-id="activeUserId"
      :is-rating-tab="isRatingTab"
      @get-user="$emit('get-user', $event)"
    />

    <div class="sidebar__footer">
      <div></div>
      <UiButton
        title="Update list"
        @click="$emit('update-users')"
      />
    </div>
  </div>
</template>

<style scoped lang="scss" src="./Sidebar.scss" />
