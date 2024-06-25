<script lang="ts">
export default {
  name: 'Login'
}
</script>

<script lang="ts" setup>
import {Form, Field, ErrorMessage, configure} from 'vee-validate'
import * as yup from 'yup';

import "firebase/firestore";
import {db} from '@/services/firebase'
import {
  query,
  getDocs,
  collection
} from 'firebase/firestore'

const router = useRouter()

const email = ref(null)
const riders = ref([])
const isExcelButtonVisible = ref(false)

const schema = yup.object({
  email: yup.string().required('Введите почту').email('Введите почту правильно'),
});

configure({
  validateOnBlur: false, // controls if `blur` events should trigger validation with `handleChange` handler
  validateOnChange: false, // controls if `change` events should trigger validation with `handleChange` handler
  validateOnInput: false, // controls if `input` events should trigger validation with `handleChange` handler
  validateOnModelUpdate: false, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
});

onBeforeMount(() => {
  window.addEventListener("keydown", showPasswordPrompt);
  window.scrollTo({top: 0});
  getRiders();
})

const showPasswordPrompt = (event: any) => {
  if (event.key === "F10") {
    if (prompt("Please enter password", '') === import.meta.env.VITE_PASSWORD) {
      isExcelButtonVisible.value = true;
    }
  }
}

const getRiders = async () => {
  riders.value = []
  const q = await query(collection(db, 'riders'));
  const docs = await getDocs(q)
  docs.forEach((doc: any) => {
    riders.value.push(doc.data())
  });
}

const onSubmit = () => {
  localStorage.setItem('email', email.value)

  router.push({name: 'home'})
}
</script>

<template>
  <div class="login">
    <download-excel
      v-if="isExcelButtonVisible"
      :data="riders"
      class="login__excel"
      name="riders.xls"
      :exportFields="{
          Номер: 'number',
          Фамилия: 'lastName',
          Имя: 'name',
          Возраст: 'age',
          Пол: 'gender',
          Email: 'email',
          Город: 'city',
          Категория: 'category',
          Телефон: 'phone',
        }"
    >
      <span>Сохранить в excel</span>
    </download-excel>

    <Form
      v-slot="{ errors }"
      :validation-schema="schema"
      class="form login__form"
      @submit="onSubmit"
    >
      <div class="login__input">
        <Field
          v-model.trim="email"
          name="email"
          type="email"
          placeholder="example@inbox.ru"
          autocomplete="off"
          class="form login__field"
        />
        <ErrorMessage name="email" class="form__error"/>
      </div>

      <button class="login__button">
        войти
      </button>
    </Form>
  </div>
</template>

<style lang="scss" scoped src="./Login.scss"></style>

<style lang="scss" scoped src="./Login.mobile.scss"></style>
