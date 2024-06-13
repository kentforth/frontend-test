<script lang="ts">
import {mask} from 'vue-the-mask'

export default {
  name: 'Registration',
  directives: {mask}
}
</script>

<script setup lang="ts">
import * as yup from 'yup';


// import "firebase/firestore";
import {db} from '@/services/firebase'
import {
  query,
  getDocs,
  collection
} from 'firebase/firestore'

import {
  Form,
  Field,
  configure,
  ErrorMessage
} from 'vee-validate';

import Agreement from "@/views/Registration/components/Agreement/Agreement.vue";

configure({
  validateOnBlur: false, // controls if `blur` events should trigger validation with `handleChange` handler
  validateOnChange: false, // controls if `change` events should trigger validation with `handleChange` handler
  validateOnInput: true, // controls if `input` events should trigger validation with `handleChange` handler
  validateOnModelUpdate: false, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
});
const schema = yup.object({
  age: yup.string().required('Введите возраст'),
  name: yup.string().required('Введите имя'),
  city: yup.string().required('Введите город'),
  lastName: yup.string().required('Введите фамилию'),
});


const router = useRouter()

const isAgree = ref(true)
const isPhoneValid = ref(true)

const form = ref({
  email: null,
  name: null,
  gender: null,
  lastName: null,
  phone: null,
  city: null,
  age: null,
  category: null
})

onBeforeMount(() => {
  form.value.email = localStorage.getItem('email')
})

const genders = ref(['муж', 'жен'])
const categories = ref(['гонщик (ГРЭВЕЛ)', 'гонщик (МТБ)', 'гонщик (ФИКС)', 'искатель (ГРЭВЕЛ)', 'искатель (МТБ)', 'искатель (ФИКС)'])
const hasGenderError = ref(false)
const hasCategoryError = ref(false)

const onAgree = () => {
  isAgree.value = true
}

const checkPhone = () => {
  if (form.value.phone === '' || form.value.phone === null) {
    isPhoneValid.value = false
    const el = document.getElementById('phone');
    el?.scrollIntoView({behavior: "smooth", block: 'center'});

    return
  }

  isPhoneValid.value = true
}

const setGender = (value: string) => {
  hasGenderError.value = false
  form.value.gender = value
}

const setCategory = (value: string) => {
  hasCategoryError.value = false
  form.value.category = value
}

const onSubmit = () => {
  if (form.value.gender === '' || form.value.gender === null) {
    hasGenderError.value = true

    return
  }
  /*checkPhone()

  if (!isPhoneValid) return*/
  console.log('SUBMIT')
}

/*onBeforeMount(async () => {
  let emails = []
  const q = await query(collection(db, 'emails'));
  const docs = await getDocs(q)
  docs.forEach((doc: any) => {
    emails.push(doc.data())
  });

  const email = localStorage.getItem('email')

  const isEmailExist = emails.some(el => el.email === email)
  if (isEmailExist) await router.replace({name: 'registrationNumber'})
})*/
</script>

<template>
  <div class="registration">
    <Agreement v-if="!isAgree" @agree="onAgree"/>

    <Form
      v-else
      v-slot="{ errors }"
      @submit="onSubmit"
      class="form registration__form"
      :validation-schema="schema"
    >
      <input type="text" v-model.trim="form.email" class="registration__email">

      <!--PHONE-->
      <div class="registration__field">
        <input
          v-model="form.phone"
          type="tel"
          v-mask="['+7 (###) ###-##-##']"
          placeholder="+7() - -"
          @input="checkPhone"
        />
        <span v-if="!isPhoneValid" class="form__error">Введите номер телефона</span>
      </div>

      <!--NAME-->
      <div class="registration__field">
        <Field
          v-model.trim="form.name"
          name="name"
          placeholder="имя"
          autocomplete="off"
        />
        <ErrorMessage name="name" class="form__error"/>
      </div>

      <!--CITY-->
      <div class="registration__field">
        <Field
          v-model.trim="form.city"
          name="city"
          placeholder="город"
          autocomplete="off"
        />
        <ErrorMessage name="city" class="form__error"/>
      </div>

      <!--LAST NAME-->
      <div class="registration__field">
        <Field
          v-model.trim="form.lastName"
          name="lastName"
          placeholder="фамилия"
          autocomplete="off"
        />
        <ErrorMessage name="lastName" class="form__error"/>
      </div>

      <!--AGE-->
      <div class="registration__field">
        <Field
          v-model.trim="form.age"
          name="age"
          type="number"
          placeholder="возраст"
          autocomplete="off"
        />
        <ErrorMessage name="age" class="form__error"/>
      </div>

      <!--GENDER-->
      <div class="registration__field">
        <Select
          v-model="form.gender"
          name="gender"
          :items="genders"
          placeholder="пол"
          @update:modelValue="setGender"
        />
        <span class="registration__error" v-if="hasGenderError">Выберите пол</span>
      </div>

      <!--CATEGORY-->
      <div class="registration__field">
        <Select
          v-model="form.category"
          name="gender"
          :items="categories"
          placeholder="категория"
          @update:modelValue="setCategory"
        />
        <span class="registration__error" v-if="hasCategoryError">Выберите категорию</span>
      </div>
    </Form>
  </div>
</template>

<style lang="scss" scoped>
.registration {
  padding: 20px;
  display: flex;
  justify-content: center;

  &__email {
    pointer-events: none;
  }

  &__form {
    margin-top: 50px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 20%;
    grid-row-gap: 50px;
  }

  &__field {
    display: flex;
    flex-direction: column;
  }

  &__error {
    color: $red;
  }
}
</style>
