export type CallbackFunction = () => void

export function useDebounce(fn: CallbackFunction, ms: number = 100) {
  let timeoutId: ReturnType<typeof setTimeout>
  return function (this: CallbackFunction, ...args: []) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}
