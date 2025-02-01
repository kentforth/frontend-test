<script setup lang="ts">
import UiSearch from "@/components/UiSearch/UiSearch.vue"
import type { IUser } from "@/types"

defineEmits(["get-user"])

interface IProps {
  users: Array<IUser>
  error: string | unknown | null
}

const { users = [], error = "" } = defineProps<IProps>()

const activeTab = ref("Clients")

const setActiveTab = (tab: string) => {
  activeTab.value = tab
}

const searchUser = (event: string) => {
  console.log(event)
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

    <div class="sidebar__body">
      <p v-if="error">{{ error }}</p>

      <UserList
        :users="users"
        @get-user="$emit('get-user', $event)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  max-width: 300px;
  height: 100svh;
  background: $white;
  box-shadow:
    rgba(14, 30, 37, 0.12) 0 0 4px 0,
    rgba(14, 30, 37, 0.32) 0 0 16px 0;

  &__header {
    background: $lightblue;
    padding: 16px;
  }

  &__body {
    padding: 16px;
  }

  &__search {
    margin-top: 20px;
  }
}
</style>
