<script lang="ts">
export default {
  name: 'Login'
}
</script>

<script lang="ts" setup>
import emailjs from 'emailjs-com';
import {Form, Field, ErrorMessage} from 'vee-validate'
import * as yup from 'yup';

const router = useRouter()

const email = ref(null)

const schema = yup.object({
  email: yup.string().required('Введите почту').email('Введите почту правильно'),
});

const sendEmail = () => {
  const templateParams = {
    to: 'yashaar@mail.ru',
    subject: 'Регистрация на Урочище 2024',
    message: `
    Привет от Урочище 2024 <br/>
    Номер участника - 5 <br/>
    Оплатить: <img src="https://s541vla.storage.yandex.net/rdisk/7c2190e5352de99e1d4e70f50a17b8bf5d7027fa85b20f46cd4b7e06fd6d3fec/6665ea99/4Vt41AMDvZ9eyQgEKS_sYSPTxuhfHm3rIG4SVnVJPZ212S3yX4s_tJk_JjTXOHLmwY2z4DL9gF6whwAmq_d88g==?uid=398863231&filename=payment.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=398863231&fsize=2501&hid=7f9e356169ff01400788b0f7985e0871&media_type=image&tknv=v2&etag=2c5a79532a9b8bbb102273b2541f0833&ts=61a789eed1840&s=521ab0904af30e988fe993920cd070e38e22606115444c5af154af5ce76a9aab&pb=U2FsdGVkX18JbEL-jl1A9oO8e4NocOnZa41y5JO45NDn2QlTpC5WNGoIiwfBkLcgFIRPe9vcEFpN7OtVGXD9BGnsA-esqGXXZYDlA11y5Lo" alt="qr" width="200" height="200">
    `
  }
  emailjs.send('service_7nte8nd', 'urochishe2024', templateParams, 'user_Q62B7RRlfcIcFCktKXEDM')
}

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
