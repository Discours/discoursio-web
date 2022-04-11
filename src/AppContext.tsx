import { Component, createContext, createEffect, createResource, useContext } from 'solid-js'
import { Meta, Title } from 'solid-meta'
import { useLocation } from 'solid-app-router'
import { createCookieStorage } from '@solid-primitives/storage'
import { createI18nContext, I18nContext } from '@solid-primitives/i18n'
import { Topic } from './graphql/types.gen'
import { createQuery } from 'solid-urql'
import topicsAll from './graphql/q/topics-all'

interface AppContextInterface {
  isDark: boolean
  loading: boolean
}

const AppContext = createContext<AppContextInterface>({
  isDark: false,
  loading: true
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AppContextProvider: Component<any> = (props) => {
  const now = new Date()
  const [topics] = createQuery({ query: topicsAll })
  const cookieOptions = { expires: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()) }
  const [settings, set] = createCookieStorage()
  const browserLang = navigator.language.slice(0, 2)
  const location = useLocation()

  if (location.query.locale) set('locale', location.query.locale, cookieOptions)
  // eslint-disable-next-line no-prototype-builtins
  else if (!settings.locale && langs.hasOwnProperty(browserLang)) set('locale', browserLang)

  const i18n = createI18nContext({}, (settings.locale || 'en') as string)
  const [t, { add, locale }] = i18n
  const params = (): DataParams => {
    const loc = i18n[1].locale()
    const page = location.pathname.slice(1) || 'home'

    return { locale: loc in langAliases ? langAliases[loc] : loc, page }
  }

  // eslint-disable-next-line no-shadow
  const [lang] = createResource(params, ({ locale }) => langs[locale]())
  // const [guidesList] = createResource(params, ({ locale }) => getGuides(locale, true))
  const isDark = () => settings.dark === 'true' || window.matchMedia('(prefers-color-scheme: dark)').matches

  createEffect(() => set('locale', i18n[1].locale()), cookieOptions)
  createEffect(() => {
    if (!lang.loading) add(i18n[1].locale(), lang() as Record<string, any>)
  })
  createEffect(() => document.documentElement.classList[isDark() ? 'add' : 'remove']('dark'))

  const store = {
    set isDark(value) {
      set('dark', value === true ? 'true' : 'false', cookieOptions)
    },
    get isDark() {
      return isDark()
    },
    // eslint-disable-next-line solid/reactivity
    get loading() {
      return lang.loading
    },
    /*
      Returns true if there are any guides in the current locale's translation.
      Note that guides() will return the english guides metadata in this case.
     */
    // get guidesSupported() {
    // const supported = getSupported('guides', params().locale);
    //return Array.isArray(supported) && supported.length > 0;
    // },
    get topics() {
      return topics()
    }
  }

  return (
    <AppContext.Provider value={store}>
      <I18nContext.Provider value={i18n}>
        <Title>{t('global.title', {}, 'discours.io')}</Title>
        <Meta name='lang' content={locale()} />
        <div dir={t('global.dir', {}, 'ltr')}>{props.children}</div>
      </I18nContext.Provider>
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
