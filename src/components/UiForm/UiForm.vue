<script lang="ts">
export default {
  name: 'UiForm'
}
</script>

<script setup lang="ts">
import help from '@/assets/icons/help.png'

const labels = ['Метки', 'Тип записи', 'Логин', 'Пароль']
const items = ['LDAP', 'Локальная']

const onAdd = () => {
  console.log('ADD')
}
</script>

<template>
  <div class="form">
    <div class="form__header">
      <h2>Учетные записи</h2>
      <button class="form__btn-add" @click="onAdd">+</button>
    </div>

    <div class="form__disclaimer">
      <img :src="help" alt="help" />
      Для указания нескольких меток для однйо пары логин/пароль используйте разделитель ;
    </div>

    <div class="form__content">
      <div class="form__labels">
        <span v-for="label in labels" :key="label">{{ label }}</span>
      </div>

      <div class="form__inputs">
        <v-text-field label="Label"></v-text-field>
        <!--        <UiInput />-->
        <UiSelect :items="items" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="./UiForm.scss"></style>
