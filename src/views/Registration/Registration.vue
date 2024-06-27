<script lang="ts">
import {mask} from 'vue-the-mask'

export default {
  name: 'Registration',
  directives: {mask}
}
</script>

<script setup lang="ts">
import * as yup from 'yup';

import {vOnClickOutside} from '@vueuse/components'

import "firebase/firestore";
import {db} from '@/services/firebase'
import {
  query,
  addDoc,
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

const riders = ref([])
const isAgree = ref(false)
const isLoading = ref(false)
const genderRef = ref(null)
const isPhoneValid = ref(true)
const categoriesRef = ref(null)
const hasGenderError = ref(false)
const hasCategoryError = ref(false)


const genders = ref(['муж', 'жен'])
const categories = ref(['гонщик (ГРЭВЕЛ)', 'гонщик (МТБ)', 'гонщик (ФИКС)', 'исследователь (ГРЭВЕЛ)', 'исследователь (МТБ)', 'исследователь (ФИКС)', 'исследователь (другое)'])

const form = ref({
  email: null,
  name: null,
  gender: null,
  number: 0,
  lastName: null,
  phone: null,
  city: null,
  age: null,
  category: null
})

const registered = computed(() => {
  return form.value.gender.value === 'муж' ? '' : 'a'
})

onBeforeMount(() => {
  form.value.email = localStorage.getItem('email')
})

const onAgree = () => {
  isAgree.value = true
  window.scrollTo(0, 0);
}

const checkPhone = () => {
  isPhoneValid.value = true

  if (form.value.phone === '' || form.value.phone === null) {
    isPhoneValid.value = false
    const el = document.getElementById('phone');
    el?.scrollIntoView({behavior: "smooth", block: 'center'});
  }
}

const setGender = (value: string) => {
  hasGenderError.value = false
  form.value.gender = value
}

const setCategory = (value: string) => {
  hasCategoryError.value = false
  form.value.category = value
}

const checkValidation = () => {
  checkPhone()

  if (form.value.gender === '' || form.value.gender === null) {
    hasGenderError.value = true
  }

  if (form.value.category === '' || form.value.category === null) {
    hasCategoryError.value = true
  }

  return !(isPhoneValid.value === false ||
    hasGenderError.value === true ||
    hasCategoryError.value === true);
}

const getRiders = async () => {
  const q = await query(collection(db, 'riders'));

  const docs = await getDocs(q)
  riders.value = []
  docs.forEach((doc: any) => {
    riders.value.push(doc.data())
  });
}

const onSubmit = async () => {
  const isValid = checkValidation()
  if (isValid) {
    try {
      isLoading.value = true

      const emailbox = collection(db, 'emailbox')
      const emailsCollection = collection(db, 'emails')
      const ridersCollection = collection(db, 'riders')

      await getRiders()

      form.value.number = riders.value.length ? riders.value.length + 1 : 1

      const email = {
        email: form.value.email,
        gender: form.value.gender,
        number: form.value.number
      }

      const templateParams = {
        to: form.value.email,
        message: {
          subject: 'Регистрация на гонку Урочище 2024',
          html: `
      Ты зарегистрирован${registered.value} на гонку Урочище 2024.
      <br/>
      <br>
      Номер участника: ${form.value.number} <br/>
      Даты: 2024.07.19 - 2024.07.21<br/>
      Место: 56.373234 84.962397 <br/>
      Стоимость для участников: 3500р. <br/>
      Реквизиты для оплаты: <a href="https://www.tinkoff.ru/rm/franchuk.anton2/TX77Z93513/" target="_blank">оплата</a>
      <br/>
      По всем вопросам: тг @snake454545, vk.com/id11854363
      <br>
      <br>
      После оплаты, пожалуйста, сохраните скриншот оплаты у себя на телефоне.
      <br>
      Еще больше информации можно найти на <a href="https://urochishe.org/details?page=2" target="_blank">сайте</a> или в <a href="https://t.me/Urochishe2022">чате</a> для участников, там вы можете задать любые вопросы.
      <br>
      <br>
      Трек маршрута появится на <a href="https://m.vk.com/event225477679" target="_blank">странице</a> группы 17 июля, следите за обновлениями.
     `
        }
      }

      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      const yyyy = today.getFullYear();
      const hours = today.getHours()
      const minutes = today.getMinutes()

      const date = mm + '.' + dd + '.' + yyyy + ' - ' + hours + ':' + minutes;

      form.value.date = date

      await addDoc(ridersCollection, form.value)
      await addDoc(emailsCollection, email)
      await addDoc(emailbox, templateParams)
      await router.push({
        name: 'registrationNumber',
        query: {
          newRegistration: 'true'
        }
      })
    } catch (e) {
      console.error(e)

    } finally {
      isLoading.value = false
    }
  }
}

const closeGenderList = () => {
  genderRef.value.isVisible = false
}

const closeCategoriesList = () => {
  categoriesRef.value.isVisible = false
}

</script>

<template>
  <div class="registration">
    <Agreement v-if="!isAgree" @agree="onAgree" class="registration__agreement"/>

    <Form
      v-else
      v-slot="{ errors }"
      :validation-schema="schema"
      class="form registration__form"
      @submit="onSubmit"
      @invalid-submit="checkValidation"
      :class="isLoading ? 'registration__blur' : ''"
    >
      <input type="text" v-model.trim="form.email" class="registration__email">

      <!--PHONE-->
      <div class="registration__field registration__phone">
        <input
          v-model="form.phone"
          type="tel"
          v-mask="['+7 (###) ###-##-##']"
          placeholder="+7(     )        -     -"
          @input="checkPhone"
        />
        <span v-if="!isPhoneValid" class="form__error">Введите номер телефона</span>
      </div>

      <!--NAME-->
      <div class="registration__field registration__name">
        <Field
          v-model.trim="form.name"
          name="name"
          placeholder="имя"
          autocomplete="off"
        />
        <ErrorMessage name="name" class="form__error"/>
      </div>

      <!--CITY-->
      <div class="registration__field registration__city">
        <Field
          v-model.trim="form.city"
          name="city"
          placeholder="город"
          autocomplete="off"
        />
        <ErrorMessage name="city" class="form__error"/>
      </div>

      <!--LAST NAME-->
      <div class="registration__field registration__last-name">
        <Field
          v-model.trim="form.lastName"
          name="lastName"
          placeholder="фамилия"
          autocomplete="off"
        />
        <ErrorMessage name="lastName" class="form__error"/>
      </div>

      <!--AGE-->
      <div class="registration__field registration__age">
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
      <div class="registration__field registration__gender">
        <Select
          ref="genderRef"
          v-model="form.gender"
          name="gender"
          :items="genders"
          placeholder="пол"
          v-on-click-outside="closeGenderList"
          @update:modelValue="setGender"
        />
        <span class="registration__error" v-if="hasGenderError">Выберите пол</span>
      </div>

      <!--CATEGORY-->
      <div class="registration__field registration__category">
        <Select
          ref="categoriesRef"
          v-model="form.category"
          name="gender"
          :items="categories"
          placeholder="категория"
          v-on-click-outside="closeCategoriesList"
          @update:modelValue="setCategory"
        />
        <span class="registration__error" v-if="hasCategoryError">Выберите категорию</span>
      </div>

      <p class="registration__text">
        вся личная информация будет скормлена диким собакам по окончании гонки и не будет использована в корыстных целях
        <br>
        (честно говоря, мы просто не в курсе как использовать информацию в корыстных целях)
      </p>

      <div class="registration__links">
        <RouterLink :to="{ name: 'home'}">главная</RouterLink>
        <span>|</span>
        <button>завершить</button>
      </div>
    </Form>

    <div class="registration__loader" v-if="isLoading">
      <div class="registration__dot registration__dot-1"></div>
      <div class="registration__dot registration__dot-2"></div>
      <div class="registration__dot registration__dot-3"></div>
      <div class="registration__dot registration__dot-4"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./Registration.scss"></style>

<style lang="scss" scoped src="./Registration.mobile.scss"></style>
