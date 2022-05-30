import { RouteDataFunc } from 'solid-app-router'
import { createEffect, createMemo } from 'solid-js'
import { useStore } from '../store'

export const AuthConfirm: RouteDataFunc = (args) => {
  const code = createMemo(() => args.params.code.replace('key-', ''))
  const [{}, { authorized, getSession }] = useStore()
  createEffect(() => {
    if (code()) {
      // oauth result
      localStorage.setItem('token', code())
      getSession()
    }
  })
  return {
    get reason() {
      return authorized() ? 'Successfully authorized' : 'Uknown reason'
    }
  }
}

export default AuthConfirm
