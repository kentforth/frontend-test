import { defineStore } from 'pinia'

export const useAccountStore = defineStore('counter', () => {
  const items = ref([
    {
      value: 'ldap',
      title: 'LDAP'
    },
    {
      value: 'local',
      title: 'Локальная'
    }
  ])
  const accounts = ref([])

  const addAccount = () => {
    const elements = [
      [
        {
          id: 'marks',
          value: null
        },
        {
          id: 'type',
          value: items.value[1].value,
          title: items.value[1].title
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

    accounts.value.push(...elements)
  }

  const deleteAccount = (index: number) => {
    accounts.value.splice(index, 1)
  }

  const updateAccountType = (index: number) => {
    const itemValue = items.value.find((el) => el.value === accounts.value[index][1].value)
    accounts.value[index][1].title = itemValue.title
    console.log('ACCOUNTS', accounts.value)
  }

  return {
    items,
    accounts,
    addAccount,
    deleteAccount,
    updateAccountType
  }
})
