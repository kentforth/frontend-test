<script setup lang="ts">
import UiSearch from "@/components/UiSearch/UiSearch.vue"
import type { IUser } from "@/types"
import arrow from "@/assets/icons/chevron-right.svg"

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

const isContentVisible = ref(false)

const setActiveTab = (tab: string) => {
  emit("set-active-tab", tab)
}

const searchUser = (user: string) => {
  emit("search-user", user)
}
</script>

<template>
  <div class="sidebar">
    <button
      class="sidebar__btn-fold"
      :class="!isContentVisible ? 'sidebar__btn-fold--folded' : ''"
      @click="isContentVisible = !isContentVisible"
    >
      <img
        :src="arrow"
        alt="arrow"
      />
    </button>
    <div
      class="sidebar__content"
      v-if="isContentVisible"
    >
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
        <div class="sidebar__footer-user-info"></div>
        <UiButton
          title="Update list"
          @click="$emit('update-users')"
        />
      </div>
    </div>
    <div
      v-else
      class="sidebar__fold"
    ></div>
  </div>
</template>

<style scoped lang="scss" src="./Sidebar.scss" />
