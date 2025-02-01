export async function useFetch(url: string) {
  const data = ref({
    data: [],
  })
  const error = ref<string | unknown>("")
  const loading = ref(false)

  try {
    loading.value = true
    data.value = await fetch(url).then((res) => res.json())
  } catch (err: unknown) {
    error.value = err
  } finally {
    loading.value = false
  }

  return { data, error }
}
