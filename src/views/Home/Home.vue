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
const users = ref<IUser[] | []>([])
const isRatingTab = ref(false)
const activeTab = ref("Clients")

const activeUserId = computed(() => {
  if (activeUser.value) {
    return (activeUser.value as IUser).id
  }

  return null
})

onBeforeMount(async () => {
  await fetchDefaultUsers()
})

const fetchDefaultUsers = async () => {
  const { data, error } = await useFetch(usersUrl)

  apiError.value = error.value
  users.value = data.value.data

  setUsers()
}

const setUsers = () => {
  sortUsers()

  users.value.forEach((user: IUser) => {
    user.rating = 0
  })

  const localUsers = JSON.parse(localStorage.getItem("users") as string)

  if (users.value && localUsers) {
    users.value.forEach((user: IUser) => {
      const foundUser = localUsers.find((el) => el.userId === user.id)

      if (findUser(user)) {
        user.comment = foundUser.comment
        user.rating = foundUser.rating
      }
    })
  }
}

const getUser = async (user: IUser) => {
  const { data, error } = await useFetch(`${usersUrl}/${user.id}`)

  apiError.value = error.value
  activeUser.value = data.value.data

  const foundUser = findUser(user)

  if (foundUser) {
    // @ts-ignore
    activeUser.value.comment = foundUser.comment
    // @ts-ignore
    activeUser.value.rating = foundUser.rating
    return
  }

  // @ts-ignore
  activeUser.value.comment = ""
  // @ts-ignore
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

  const _users: unknown[] = []

  const localUsers = JSON.parse(localStorage.getItem("users") as string)

  const originalUsersIndex = users.value.findIndex(
    (user) => user.id === _user.id,
  )

  if (localUsers) {
    if (findUser(_user)) {
      const index = localUsers.findIndex((user) => user.userId === _user.id)

      localUsers[index] = { ...user }
      localStorage.setItem("users", JSON.stringify(localUsers))

      users.value[originalUsersIndex].rating = _user.rating
      sortUsers()
      return
    }

    localUsers.push(user)
    localStorage.setItem("users", JSON.stringify(localUsers))

    users.value[originalUsersIndex].rating = _user.rating

    sortUsers()
    return
  }

  _users.push(user)

  localStorage.setItem("users", JSON.stringify(_users))
  users.value[originalUsersIndex].rating = _user.rating

  sortUsers()
}

const setActiveTab = (tab: string) => {
  isRatingTab.value = tab === "Rating"
  activeTab.value = tab
  activeUser.value = null

  sortUsers()
}

const sortUsers = () => {
  if (activeTab.value === "Rating") {
    users.value = users.value.sort(
      (a, b) => (b.rating as number) - (a.rating as number),
    )

    return
  }

  users.value = users.value.sort((a, b) => {
    if (a.last_name.toLowerCase() < b.last_name.toLowerCase()) {
      return -1
    }

    return 0
  })
}

const searchUser = async (user: string) => {
  activeUser.value = null

  const fullName = user.toLowerCase().split(" ")

  const foundUsers: any = []

  await fetchDefaultUsers()

  users.value.forEach((user) => {
    if (
      fullName.includes(user.first_name.toLowerCase()) ||
      fullName.includes(user.last_name.toLowerCase())
    ) {
      foundUsers.push(user)
    }
  })

  if (foundUsers.length > 0) {
    users.value = []

    for (const user of foundUsers) {
      const { data, error } = await useFetch(`${usersUrl}/${user.id}`)
      apiError.value = error.value
      users.value.push(data.value.data as never)
    }

    setUsers()
  }

  sortUsers()
}

const updateUsers = async () => {
  await fetchDefaultUsers()
}
</script>

<template>
  <div class="home">
    <Sidebar
      :users="users"
      :error="apiError"
      :active-user-id="activeUserId"
      :is-rating-tab="isRatingTab"
      :active-user="activeUser as IUser"
      @get-user="getUser"
      @save-user="saveUser"
      @set-active-tab="setActiveTab"
      @search-user="searchUser"
      @update-users="updateUsers"
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
  display: grid;
  grid-template-columns: 100% 1fr;
  align-items: center;

  &__content {
    display: none;
    padding: 0 16px;
    max-width: 100%;
  }

  &__select {
    font-weight: bold;
    font-size: 24px;
  }

  @media (min-width: 601px) {
    grid-template-columns: max-content 1fr;

    &__content {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
