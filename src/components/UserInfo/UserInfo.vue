<script setup lang="ts">
import type { IUser } from "@/types"
import Counter from "@/components/Counter/Counter.vue"
import UiButton from "@/components/UiButton/UiButton.vue"

const emit = defineEmits(["save-user"])

interface IProps {
  user: IUser
}

const props = withDefaults(defineProps<IProps>(), {
  user: {
    id: null,
    first_name: null,
    last_name: null,
    email: null,
    avatar: "",
    rating: 0,
  },
})

const comment = defineModel<string>()

const points = ref(0)

const decreasePoints = () => {
  if (points.value === 0) return

  points.value = points.value - 1
}

const saveUser = () => {
  const user = {
    ...props.user,
    comment: comment.value,
    rating: points.value,
  }

  comment.value = ""
  emit("save-user", user)
}
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
        <Counter
          :default-points="points"
          class="user-info__counter"
          @decrease="decreasePoints"
          @increase="points = points + 1"
        />
        <textarea
          v-model="comment"
          rows="5"
          class="user-info__comment"
        />
      </div>
    </div>

    <UiButton
      class="user-info__btn-save"
      title="Save"
      @click="saveUser"
    />
  </div>
</template>

<style scoped lang="scss" src="./UserInfo.scss" />
