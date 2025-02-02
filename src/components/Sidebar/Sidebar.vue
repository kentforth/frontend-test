<script setup lang="ts">
import UiSearch from "@/components/UiSearch/UiSearch.vue"
import type { IUser } from "@/types"
import loader from "@/assets/loader.gif"

const emit = defineEmits(["get-user", "set-active-tab", "search-user"])

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

    <Suspense>
      <template #fallback>
        <div class="sidebar__loader">
          <img
            :src="loader"
            alt="loader"
          />
        </div>
      </template>

      <UserList
        :users="users"
        :active-user-id="activeUserId"
        :is-rating-tab="isRatingTab"
        @get-user="$emit('get-user', $event)"
      />
    </Suspense>
  </div>
</template>

<style scoped lang="scss" src="./Sidebar.scss" />
