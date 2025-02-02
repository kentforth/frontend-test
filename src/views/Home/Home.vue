<script lang="ts">
export default {
  name: "Home",
}
</script>

<script setup lang="ts">
import Sidebar from "@/components/Sidebar/Sidebar.vue"
import type { IUser } from "@/types"
import { useFetch } from "@/composables/use-fetch"
import UserInfo from "@/components/UserInfo/UserInfo.vue"

const usersUrl = "https://reqres.in/api/users"

const activeUser = ref<IUser | null | unknown>(null)
const apiError = ref<string | unknown>("")
const users = ref([])

onBeforeMount(async () => {
  const { data, error } = await useFetch(usersUrl)
  apiError.value = error.value
  users.value = data.value.data
})

const getUser = async (user: IUser) => {
  const { data, error } = await useFetch(
    `https://reqres.in/api/users/${user.id}`,
  )
  apiError.value = error.value
  activeUser.value = data.value.data
}
</script>

<template>
  <div class="home">
    <Sidebar
      :users="users"
      :error="apiError"
      @get-user="getUser"
    />

    <div class="home__content">
      <UserInfo
        v-if="activeUser"
        :user="activeUser as IUser"
      />
      <p
        class="home__select"
        v-else
      >
        Select a client
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  align-items: center;

  &__content {
    padding: 0 16px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__select {
    font-weight: bold;
    font-size: 24px;
  }
}
</style>
