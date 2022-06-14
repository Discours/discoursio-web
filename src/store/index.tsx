import { createI18nContext, I18nContext } from '@solid-primitives/i18n'
import { createCookieStorage } from '@solid-primitives/storage'
import { useLocation } from 'solid-app-router'
import { createContext, createEffect, createResource, onMount, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Meta, Title } from 'solid-meta'
import { AuthStoreProvider } from './auth'
import { ZineStoreProvider } from './zine'

type ModalType = '' | 'auth' | 'subscribe' | 'feedback' | 'share' | 'thank' | 'donate'
type WarnKind = 'error' | 'warn' | 'info'

// Some browsers does not map correctly to some locale code
// due to offering multiple locale code for similar language (e.g. tl and fil)
// This object maps it to correct `langs` key
const langAliases: Record<string, string> = { fil: 'tl' }

interface CommonStore {
  warnings?: {
    body: string
    kind: WarnKind
    seen?: boolean
  }[]
  modal?: ModalType
  isDark: boolean
  lang: string
}

const langs: { [lang: string]: any } = {
  en: async () => (await import('../../lang/en/en')).default(),
  ru: async () => (await import('../../lang/ru/ru')).default()
}

const StoreContext = createContext<[CommonStore, any]>([{} as CommonStore, {}])
const Provider = StoreContext.Provider

export interface Warning {
  body: string
  kind: WarnKind
  seen?: boolean
}

export function StoreProvider(props: { children: any }) {                                                                                                            
  const now = new Date()
  const cookieOptions = { expires: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()) }
  const [settings, setSettings] = createCookieStorage()
  const browserLang = navigator.language.slice(0, 2)
  const location = useLocation()

  if (location.query.lang)
    setSettings('locale', location.query.lang, cookieOptions)
  else if (!settings.locale && langs.hasOwnProperty(browserLang))
    setSettings('locale', browserLang)

  const i18n = createI18nContext({}, (settings.locale || 'ru') as string)
  const [t, { add, locale }] = i18n
  const params = () => {
    const lcl = i18n[1].locale()
    const page = location.pathname.slice(1) || 'home'
    return { locale: lcl in langAliases ? langAliases[lcl] : lcl, page }
  }
  const [langstore] = createResource(params, ({ locale }) => langs[locale]())
  const isDark = () => settings.dark === 'true' || window.matchMedia('(prefers-color-scheme: dark)').matches
  createEffect(() => setSettings('locale', i18n[1].locale(), cookieOptions))
  createEffect(() => { if(!langstore.loading) add(i18n[1].locale(), langstore() as Record<string, any>) })
  createEffect(() => { if(isDark()) document.documentElement.classList.add('dark') })

  const [state, setState] = createStore({
    warnings: [] as Warning[],
    modal: '' as ModalType,
    isDark: false,
    lang: 'ru'
  })

  onMount(() => {
    console.info('[store] app context is mounted')
    const now = new Date()
    const cookieOptions = { expires: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()) }
    if (location.query.lang) setSettings('locale', location.query.lang, cookieOptions)
    else {
      const browserLang = navigator.language.slice(0,2)
      if (location.query.lang) setSettings('locale', browserLang, cookieOptions)
      else if (!settings.locale && langs.hasOwnProperty(browserLang)) setSettings('locale', i18n[1].locale(), cookieOptions)
    }
    console.info('[store] locale is ' + locale())
  })

  const actions = {
    // warnings
    warn: (w: Warning) => setState({ ...state, warnings: [...state.warnings, w] }),
    unwarn: (index: number) => {
      let w: Warning = state.warnings[index]
      w.seen = true
      setState({ ...state, warnings: [...state.warnings, w] })
    },
    resetWarns: () => {
      let warnings = state.warnings.map(x => {
        x.seen = false
        return x
      })
      setState({ ...state, warnings })
    },
    clearWarns: () => setState({...state, warnings: []}),

    // modal
    getModal: () => state.modal,
    showModal: (name: ModalType) => setState({ ...state, modal: name }),
    hideModal: () => setState({ ...state, modal: '' }),

  }

  return  (
    <Provider value={[state,actions]}>
      <I18nContext.Provider value={i18n}>
        <Title>{t('global.title', {}, 'discours.io')}</Title>
        <Meta name='lang' content={locale()} />
        <AuthStoreProvider>
          <ZineStoreProvider>
            {props.children}
          </ZineStoreProvider>
        </AuthStoreProvider>
      </I18nContext.Provider>
    </Provider>
  )
}

export function useStore() {
  return useContext(StoreContext)
}
