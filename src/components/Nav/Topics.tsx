import { useI18n } from '@solid-primitives/i18n'
import { NavLink } from 'solid-app-router'
import { For, Show, createMemo } from 'solid-js'
import { Topic } from '../../graphql/types.gen'
import Icon from './Icon'
import './Topics.scss'

export default (props: any) => {
  const [t, { locale }] = useI18n()
  const tag = (t: Topic) => (/[а-яА-ЯЁё]/.test(t.title || '') && locale() !== 'ru' ? t.slug : t.title)
  const topics = createMemo(() => Array.from(props?.topics || [])) // TODO: something about subtopics
  return (
    <nav class='subnavigation wide-container text-2xl'>
      <ul class='topics'>
        <Show when={!!topics()}>
          <For each={Array.from(topics() as Topic[])}>
            {(t: Topic) => (
              <li class='item'>
                <NavLink href={`/topic/${t.slug}`}>
                  <span>#{tag(t)}</span>
                </NavLink>
              </li>
            )}
          </For>
          <li class='item right'>
            <NavLink href={`/topics`}>
              <span>
                {t('more')}{' >>'}
              </span>
            </NavLink>
          </li>
        </Show>
      </ul>
    </nav>
  )
}
