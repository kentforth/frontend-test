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
  let savedAccounts = []

  const setInitialAccounts = () => {
    const items = JSON.parse(localStorage.getItem('accounts'))

    if (items) {
      accounts.value = items.map((el) => {
        el[0] = {
          id: 'marks',
          value:
            el[0].text === null
              ? null
              : el[0]
                  .map((el) => el.text)
                  .join('; ')
                  .replace(/\s/g, '')
        }

        return el
      })
    }
  }

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

    const storageAccounts = localStorage.getItem('accounts')

    if (storageAccounts) {
      const items = JSON.parse(storageAccounts)
      items.splice(index, 1)
      localStorage.setItem('accounts', JSON.stringify(items))
    }
  }

  const updateAccountType = (index: number) => {
    const itemValue = items.value.find((el) => el.value === accounts.value[index][1].value)

    accounts.value[index][1].title = itemValue.title

    if (accounts.value[index][1].value === 'ldap') {
      accounts.value[index][3].value = null
    }
  }

  const saveAccounts = () => {
    savedAccounts = []

    savedAccounts = JSON.parse(JSON.stringify(accounts.value))

    savedAccounts = savedAccounts.map((el) => {
      if (el[0].value) {
        let marks = el[0].value.split(';')

        marks = marks.map((mark) => {
          return {
            text: mark
          }
        })

        if (el[0].id === 'marks') el[0] = [...marks]

        return el
      }

      if (el[0].id === 'marks') el[0] = { text: null }

      return el
    })

    localStorage.setItem('accounts', JSON.stringify(savedAccounts))
  }

  return {
    items,
    accounts,
    addAccount,
    saveAccounts,
    deleteAccount,
    updateAccountType,
    setInitialAccounts
  }
})
