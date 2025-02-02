<script setup lang="ts">
import type { IUser } from "@/types"
import Counter from "@/components/Counter/Counter.vue"

interface IProps {
  user: IUser
}

const {
  user = {
    id: null,
    first_name: null,
    last_name: null,
    email: null,
    avatar: "",
    alt: "",
  },
} = defineProps<IProps>()
</script>

<template>
  <div class="user-info">
    <div class="user-info__content">
      <div class="user-info__image">
        <img
          :src="user.avatar"
          :alt="user.alt"
        />
      </div>

      <div class="user-info__info">
        <h2>{{ user.first_name }} {{ user.last_name }}</h2>
        <p class="user-info__email">{{ user.email }}</p>
        <Counter />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./UserInfo.scss" />
