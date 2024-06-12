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

const router = useRouter()

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
  <div>
    Registration
  </div>
</template>

<style></style>
