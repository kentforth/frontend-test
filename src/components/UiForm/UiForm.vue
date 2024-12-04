<script lang="ts">
export default {
  name: 'UiForm'
}
</script>

<script setup lang="ts">
import help from '@/assets/icons/help.png'
import { useAccountStore } from '@/store/account'

const labels = ['Метки', 'Тип записи', 'Логин', 'Пароль']

const accountStore = useAccountStore()
</script>

<template>
  <div class="form">
    <div class="form__header">
      <h2>Учетные записи</h2>
      <button class="form__btn-add" @click="accountStore.addAccount">+</button>
    </div>

    <div class="form__disclaimer">
      <img :src="help" alt="help" />
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </div>

    <div class="form__content">
      <div class="form__labels">
        <span v-for="label in labels" :key="label">{{ label }}</span>
      </div>

      <v-form class="form__form">
        <template v-for="(field, index) in accountStore.accounts" :key="field[0].id">
          <v-text-field
            variant="outlined"
            maxLength="50"
            v-model="accountStore.accounts[index][0].value"
          />

          <v-select
            v-model="accountStore.accounts[index][1].value"
            :items="accountStore.items"
            variant="outlined"
            @update:modelValue="accountStore.updateAccountType(index)"
          />

          <v-text-field
            v-model="accountStore.accounts[index][2].value"
            variant="outlined"
            maxLength="100"
            class="w-100"
            :class="accountStore.accounts[index][1].value === 'ldap' ? 'form__login-field' : ''"
          />

          <v-text-field
            v-if="accountStore.accounts[index][1].value === 'local'"
            v-model="accountStore.accounts[index][3].value"
            type="password"
            variant="outlined"
            maxLength="100"
            append-inner-icon="mdi-eye-off-outline"
          />

          <button class="form__btn-delete" @click.prevent="accountStore.deleteAccount(index)">
            <v-icon icon="mdi-trash-can-outline"></v-icon>
          </button>
        </template>
      </v-form>
    </div>
  </div>
</template>

<style lang="scss" src="./UiForm.scss"></style>
