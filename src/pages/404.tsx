import { Component } from 'solid-js'
import { useI18n } from '@solid-primitives/i18n'

const FourOhFour: Component<any> = () => {
  const [t] = useI18n()

  return (
    <div>
      <div class='flex flex-col justify-center content-center text-center m-10 bg-gray-100 dark:bg-gray-800 py-10 text-discours-medium'>
        <div class='my-10 py-10'>
          <h2 class='mt-5 text-4xl font-semibold'>{t('global.404.header', {}, 'Oops. Four oh four.')}</h2>
          <h2 class='text-2xl text-discours-gray'>
            {t('global.404.body', {}, "believes this page definitely doesn't exist.")}
          </h2>
        </div>
      </div>
    </div>
  )
}

export default FourOhFour
