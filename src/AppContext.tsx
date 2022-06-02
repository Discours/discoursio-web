import { Component, createContext, createEffect, createResource, useContext } from 'solid-js'
import { Meta, Title } from 'solid-meta'
import { useLocation } from 'solid-app-router'
import { createCookieStorage } from '@solid-primitives/storage'
import { createI18nContext, I18nContext } from '@solid-primitives/i18n'

interface AppContextInterface {
  isDark: boolean
  lang: string
}

const AppContext = createContext<AppContextInterface>({
  isDark: false,
  lang: 'ru'
})

const langs: { [lang: string]: any } = {
  en: async () => (await import('../lang/en/en')).default(),
  ru: async () => (await import('../lang/ru/ru')).default()
}

// Some browsers does not map correctly to some locale code
// due to offering multiple locale code for similar language (e.g. tl and fil)
// This object maps it to correct `langs` key
const langAliases: Record<string, string> = { fil: 'tl' }

type DataParams = {
  locale: string
  page: string
}

export const AppContextProvider: Component<any> = (props) => {
  const now = new Date()
  const cookieOptions = { expires: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()) }
  const [settings, setSettings] = createCookieStorage()
  const browserLang = navigator.language.slice(0, 2)
  const location = useLocation()

  if (location.query.lang) 
    setSettings('locale', location.query.lang, cookieOptions)
  else if (!settings.locale && langs.hasOwnProperty(browserLang)) 
    setSettings('locale', browserLang)

  const i18n = createI18nContext({}, (settings.locale || 'en') as string)
  const [t, { add, locale }] = i18n
  const params = (): DataParams => {
    const loc = i18n[1].locale()
    const page = location.pathname.slice(1) || 'home'

    return { locale: loc in langAliases ? langAliases[loc] : loc, page }
  }

  // eslint-disable-next-line no-shadow
  const [langstore] = createResource(params, ({ locale }) => langs[locale]())
  const isDark = () => settings.dark === 'true' || window.matchMedia('(prefers-color-scheme: dark)').matches

  createEffect(() => setSettings('locale', i18n[1].locale()), cookieOptions)
  createEffect(() => {
    if (!langstore.loading) add(i18n[1].locale(), langstore() as Record<string, any>)
  })
  createEffect(() => document.documentElement.classList[isDark() ? 'add' : 'remove']('dark'))

  const store = {
    set isDark(value) {
      setSettings('dark', value === true ? 'true' : 'false', cookieOptions)
    },
    get isDark() {
      return isDark()
    },
    get lang() {
      return langstore()
    }
  }

  return (
    <AppContext.Provider value={store}>
      <I18nContext.Provider value={i18n}>
        <Title>{t('global.title', {}, 'discours.io')}</Title>
        <Meta name='lang' content={locale()} />
        <>{props.children}</>
      </I18nContext.Provider>
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
