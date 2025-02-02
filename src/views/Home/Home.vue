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

const activeUser = ref<IUser | null | unknown | {}>(null)
const apiError = ref<string | unknown>("")
const users = ref([])

onBeforeMount(async () => {
  const { data, error } = await useFetch(usersUrl)

  apiError.value = error.value
  users.value = data.value.data

  const localUsers = JSON.parse(localStorage.getItem("users") as string)

  if (users.value && localUsers) {
    users.value.forEach((user: IUser) => {
      const foundUser = localUsers.find((el) => el.userId === user.id)

      if (findUser(user)) {
        user.comment = foundUser.comment
        user.rating = foundUser.rating
      }
    })

    console.log("USRRR", users.value)
  }
})

const getUser = async (user: IUser) => {
  const { data, error } = await useFetch(
    `https://reqres.in/api/users/${user.id}`,
  )

  apiError.value = error.value
  activeUser.value = data.value.data

  const foundUser = findUser(user)

  if (foundUser) {
    console.log("FOUND USER", foundUser)
    activeUser.value.comment = foundUser.comment
    activeUser.value.rating = foundUser.rating
    console.log("ACTIVE USER", activeUser.value)
    return
  }

  activeUser.value.comment = ""
  activeUser.value.rating = 0
}

const findUser = (_user: IUser) => {
  const localUsers = JSON.parse(localStorage.getItem("users") as string)

  if (localUsers) {
    return localUsers.find((user) => user.userId === _user.id)
  }

  return null
}

const saveUser = (_user: IUser) => {
  const user = {
    userId: _user.id,
    rating: _user.rating,
    comment: _user.comment,
  }

  const users: unknown[] = []

  const localUsers = JSON.parse(localStorage.getItem("users") as string)

  if (localUsers) {
    if (findUser(_user)) {
      const index = localUsers.findIndex((user) => user.userId === _user.id)

      localUsers[index] = { ...user }
      localStorage.setItem("users", JSON.stringify(localUsers))

      return
    }

    localUsers.push(user)
    localStorage.setItem("users", JSON.stringify(localUsers))

    return
  }

  users.push(user)

  localStorage.setItem("users", JSON.stringify(users))
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
        @save-user="saveUser"
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
