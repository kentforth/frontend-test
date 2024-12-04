<script lang="ts">
export default {
  name: 'UiForm'
}
</script>

<script setup lang="ts">
import help from '@/assets/icons/help.png'

const labels = ['Метки', 'Тип записи', 'Логин', 'Пароль']
const items = [
  {
    value: 'ldap',
    title: 'LDAP'
  },
  {
    value: 'local',
    title: 'Локальная'
  }
]

const fields = ref([])

const onAdd = () => {
  const elements = [
    [
      {
        id: 'marks',
        value: null
      },
      {
        id: 'type',
        value: items[1].value,
        title: items[1].title
      },
      {
        id: 'login',
        value: null
      },
      {
        id: 'password',
        value: null
      }
    ]
  ]

  fields.value.push(...elements)
}

const onDelete = (index: number) => {
  fields.value.splice(index, 1)
  console.log('FIELDS', fields.value)
}

const onChange = (index: number) => {
  const itemValue = items.find((el) => el.value === fields.value[index][1].value)
  fields.value[index][1].title = itemValue.title
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

      <v-form class="form__form">
        <template v-for="(field, index) in fields" :key="field[0].id">
          <v-text-field variant="outlined" maxLength="50" v-model="fields[index][0].value" />

          <v-select
            v-model="fields[index][1].value"
            :items="items"
            variant="outlined"
            @update:modelValue="onChange(index)"
          />

          <v-text-field
            v-model="fields[index][2].value"
            variant="outlined"
            maxLength="100"
            class="w-100"
          />

          <v-text-field
            v-model="fields[index][3].value"
            type="password"
            variant="outlined"
            maxLength="100"
            append-inner-icon="mdi-eye-off-outline"
          />

          <button class="form__btn-delete" @click.prevent="onDelete(index)">
            <v-icon icon="mdi-trash-can-outline"></v-icon>
          </button>
        </template>
      </v-form>
    </div>
  </div>
</template>

<style lang="scss" src="./UiForm.scss"></style>
