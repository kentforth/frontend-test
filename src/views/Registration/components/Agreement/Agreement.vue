<script lang="ts">
export default {
  name: 'Agree'
}
</script>

<script setup lang="ts">
import Checkbox from "../Checkbox/Checkbox.vue";

const emit = defineEmits(['agree'])

const agreement = ref({
  age: true,
  limits: false,
  injury: false,
  animals: false,
  physics: false,
  distance: false
})

const items = [
  {
    id: 1,
    text: 'Мне больше 18 лет',
    value: 'age'
  },
  {
    id: 2,
    text: 'У меня нет ограничений по здоровью, препятствующих моему участию в Гонке',
    value: 'limits'
  },
  {
    id: 3,
    text: 'Я осознаю и принимаю возможные риски, влючая, но не ограничиваясь:',
  },
  {
    id: 4,
    text: 'черезмерные физические нагрузки',
    value: 'physics'
  },
  {
    id: 5,
    text: 'физические и эмоциональные травмы',
    value: 'injury'
  },
  {
    id: 6,
    text: 'нападение диких или одомашненных животных',
    value: 'animals'
  },
  {
    id: 7,
    text: 'Я понимаю, что могу сойти с дистанции в любой момент и обратиться за помощью',
    value: 'distance'
  },
]

const updateCheckbox = (value, item) => {
  agreement.value[item.value] = value
}

const onSubmit = () => {
  const isTrue = Object.values(agreement.value).every(field => field === true)
  if (isTrue) {
    emit('agree')
  }
}
</script>

<template>
  <div class="agreement">
    <div class="agreement__items">
      <div class="agreement__item" v-for="item in items" :key="item.id">
        <p>{{ item.text }}</p>
        <Checkbox @update="updateCheckbox($event, item)" v-if="item.id !== 3" class="agreement__checkbox"/>
      </div>
    </div>
    <div class="agreement__links">
      <RouterLink :to="{ name: 'home'}">главная</RouterLink>
      <span>|</span>
      <button @click="onSubmit">
        далее
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./Agreement.scss"></style>

<style lang="scss" scoped src="./Agreement.mobile.scss"></style>
