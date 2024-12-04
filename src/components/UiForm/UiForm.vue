<script lang="ts">
export default {
  name: 'UiForm'
}
</script>

<script setup lang="ts">
import help from '@/assets/icons/help.png'
import { useAccountStore } from '@/store/account'
import debounce from 'lodash.debounce'

const labels = ['Метки', 'Тип записи', 'Логин', 'Пароль']

const form = ref(false)
const login = ref(null)
const password = ref(null)

const accountStore = useAccountStore()

const updateSelect = (index: number) => {
  accountStore.updateAccountType(index)
  validateForm()
}

const resetLoginValidation = (index: number) => {
  if (
    accountStore.accounts[index][2].value === null ||
    accountStore.accounts[index][2].value === undefined
  ) {
    login.value[0].reset()
  }
}

const resetPasswordValidation = async (index: number) => {
  if (
    accountStore.accounts[index][3].value === null ||
    accountStore.accounts[index][3].value === undefined
  ) {
    password.value[0].reset()
  }
}

const validateForm = debounce(() => {
  if (!form.value.isValid) {
    form.value.validate()

    return
  }

  accountStore.saveAccounts()
}, 500)
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

      <v-form class="form__form" ref="form">
        <template v-for="(field, index) in accountStore.accounts" :key="field[0].id">
          <v-text-field
            v-model="accountStore.accounts[index][0].value"
            variant="outlined"
            maxLength="50"
            hide-details
            @input="validateForm"
          />

          <v-select
            v-model="accountStore.accounts[index][1].value"
            :items="accountStore.items"
            variant="outlined"
            hide-details
            @update:modelValue="updateSelect(index)"
          />

          <v-text-field
            ref="login"
            v-model="accountStore.accounts[index][2].value"
            variant="outlined"
            maxLength="100"
            required
            :rules="[(v) => !!v || 'Поле обязательно']"
            hide-details
            class="w-100"
            :class="accountStore.accounts[index][1].value === 'ldap' ? 'form__login-field' : ''"
            @blur="resetLoginValidation(index)"
            @input="validateForm"
          />

          <v-text-field
            ref="password"
            v-if="accountStore.accounts[index][1].value === 'local'"
            v-model="accountStore.accounts[index][3].value"
            type="password"
            variant="outlined"
            maxLength="100"
            hide-details
            :rules="[(v) => !!v || 'Поле обязательно']"
            :required="accountStore.accounts[index][1].value === 'local'"
            append-inner-icon="mdi-eye-off-outline"
            @blur="resetPasswordValidation(index)"
            @input="validateForm"
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
