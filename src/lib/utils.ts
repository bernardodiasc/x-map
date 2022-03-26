export const isSSR = typeof window === 'undefined'

const noop = () => {}
const fakeLocalStorage = {
  getItem: noop,
  setItem: noop,
  removeItem: noop
}

export function getLocalStorage () {
  return isSSR ? fakeLocalStorage : window.localStorage
}
