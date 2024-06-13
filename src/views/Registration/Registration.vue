<script lang="ts">
export default {
  name: 'Registration'
}
</script>

<script setup lang="ts">
import "firebase/firestore";
import {db} from '@/services/firebase'
import {
  query,
  getDocs,
  collection
} from 'firebase/firestore'
import Agreement from "@/views/Registration/components/Agreement/Agreement.vue";

const router = useRouter()

const isAgree = ref(false)

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
    <Agreement v-if="!isAgree"/>
  </div>
</template>

<style lang="scss" scoped>
.registration {
  padding: 20px;
  display: flex;
  justify-content: center;
}
</style>
