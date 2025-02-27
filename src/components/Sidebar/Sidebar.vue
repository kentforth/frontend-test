<script setup lang="ts">
import UiSearch from "@/components/UiSearch/UiSearch.vue"
import type { IUser } from "@/types"
import arrow from "@/assets/icons/chevron-right.svg"

const emit = defineEmits([
  "get-user",
  "set-active-tab",
  "search-user",
  "update-users",
  "save-user",
])

interface IProps {
  users: Array<IUser>
  error: string | unknown | null
  isRatingTab: boolean
  activeUserId: number | null
  activeUser: IUser | null | unknown | {}
}

const {
  users = [],
  error = "",
  isRatingTab = false,
  activeUserId = null,
  activeUser = null,
} = defineProps<IProps>()

const isContentVisible = ref(true)

const setActiveTab = (tab: string) => {
  emit("set-active-tab", tab)
}

const searchUser = (user: string) => {
  emit("search-user", user)
}
</script>

<template>
  <div
    class="sidebar"
    :class="!isContentVisible ? 'sidebar--folded' : ''"
  >
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
        <div
          v-if="activeUser"
          class="sidebar__footer-user-info"
          :class="activeUserId ? 'sidebar__footer-user-info--active' : ''"
        >
          <UserInfo
            :user="activeUser as IUser"
            @save-user="$emit('save-user', $event)"
          />
        </div>
        <UiButton
          title="Update list"
          class="sidebar__btn-footer"
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
