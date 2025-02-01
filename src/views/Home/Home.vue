<script lang="ts">
export default {
  name: "Home",
}
</script>

<script setup lang="ts">
import Sidebar from "@/components/Sidebar/Sidebar.vue"
import type { IUser } from "@/types"
import { useFetch } from "@/composables/use-fetch"

const usersUrl = "https://reqres.in/api/users"

const activeUser = ref<IUser | null>(null)
const apiError = ref<string | unknown>("")
const users = ref([])

onBeforeMount(async () => {
  const { data, error } = await useFetch(usersUrl)
  apiError.value = error.value
  users.value = data.value.data
})

const getUser = (user: IUser) => {
  activeUser.value = user
}
</script>

<template>
  <div class="home">
    <Sidebar
      :users="users"
      :error="apiError"
      @get-user="getUser"
    />
    <div>sdfas</div>
  </div>
</template>

<style>
.home {
  display: flex;
  align-items: center;
}
</style>
