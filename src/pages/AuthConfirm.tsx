import { RouteDataFunc } from 'solid-app-router'
import { createEffect, createMemo } from 'solid-js'
import { useStore } from '../store'

export const AuthConfirm: RouteDataFunc = (args) => {
  const code = createMemo(() => args.params.code)
  const [{}, { authorized, getSession }] = useStore()
  createEffect(() => {
    if (code()) {
      // oauth result
      localStorage.setItem('token', code())
      getSession()
    } else console.error('[auth] no code')
  })
  return {
    get reason() {
      return authorized() ? 'Successfully authorized' : 'Uknown reason'
    }
  }
}

export default AuthConfirm
