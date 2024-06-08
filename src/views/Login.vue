<script lang="ts">
export default {
  name: 'Login'
}
</script>

<script lang="ts" setup>
import {Form, Field, ErrorMessage} from 'vee-validate'
import * as yup from 'yup';

const router = useRouter()

const email = ref(null)

const schema = yup.object({
  email: yup.string().required('Введите почту').email('Введите почту правильно'),
});

const onSubmit = async () => {
  localStorage.setItem('email', email.value)
  
  router.push({name: 'home'})
}
</script>

<template>
  <div class="login">
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

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__button {
    margin-top: 20px;
    font-size: 40px;
    font-family: 'PrimitiveRussian', sans-serif;
  }
}

@include ui-mobile-only {
  input {
    font-size: 20px;
  }
}
</style>
