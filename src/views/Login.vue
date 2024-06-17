<script lang="ts">
export default {
  name: 'Login'
}
</script>

<script lang="ts" setup>
import {Form, Field, ErrorMessage} from 'vee-validate'
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
      <Field
        v-model.trim="email"
        name="email"
        type="email"
        placeholder="example@inbox.ru"
        autocomplete="off"
        class="form login__field"
      />
      <ErrorMessage name="email" class="form__error"/>

      <button class="login__button">
        Войти
      </button>
    </Form>
  </div>
</template>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__field {
    &::placeholder {
      text-align: center;
    }
  }

  &__button {
    margin-top: 20px;
    font-size: 40px;
    font-family: 'PrimitiveRussian', sans-serif;
  }

  &__excel {
    position: absolute;
    top: 100px;
    width: max-content;
    background-color: $green;
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    border-radius: 4px;
    font-weight: 600;
    color: $black;

    img {
      width: 20px;
      margin-left: 5px;
    }
  }
}

@include ui-mobile-only {
  input {
    font-size: 20px;
  }
}
</style>
