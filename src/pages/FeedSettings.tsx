import { useI18n } from "@solid-primitives/i18n"
import {createMemo, createSignal} from "solid-js"
import {useRouteData} from "solid-app-router";
import {ZineState} from "../store/zine"
import '../styles/FeedSettings.scss'

const FeedSettings = () => {
  const [t] = useI18n()
  const data = useRouteData<ZineState>()
  const [mode, setMode] = createSignal(data.args?.by || 'topics')

  const articles = createMemo(() => {
    switch(mode()) {
      case 'topics':
      default:
        return {}
    }
  })
  return (
    <div class="container">
      <h1>{t('Feed settings')}</h1>

      <ul class="view-switcher">
        <li class="selected">
          <a href="?by=topics" onClick={() => setMode('topics')}>{t('topics')}</a>
        </li>
        <li>
          <a href="?by=collections" onClick={() => setMode('collections')}>{t('collections')}</a>
        </li>
        <li>
          <a href="?by=authors" onClick={() => setMode('authors')}>{t('authors')}</a>
        </li>
        <li>
          <a href="?by=actions" onClick={() => setMode('actions')}>{t('actions')}</a>
        </li>
      </ul>


      <div class="settings-list">
        <div class="settings-list__row">
          <h2>Общее</h2>
        </div>

        <div class="settings-list__row">
          <label for="checkbox1" class="settings-list__cell">
            Комментарии к&nbsp;моим постам
          </label>
          <div class="settings-list__cell">
            <input type="checkbox" name="checkbox1" id="checkbox1"/>
            <label for="checkbox1"/>
          </div>
          <div class="settings-list__cell">
            <input type="checkbox" name="checkbox1-notification" id="checkbox1-notification" class="notifications-checkbox"/>
            <label for="checkbox1-notification"/>
          </div>
        </div>

        <div class="settings-list__row">
          <label for="checkbox2" class="settings-list__cell">
            новые подписчики
          </label>
          <div class="settings-list__cell">
            <input type="checkbox" name="checkbox2" id="checkbox2"/>
            <label for="checkbox2"/>
          </div>
          <div class="settings-list__cell">
            <input type="checkbox" name="checkbox2-notification" id="checkbox2-notification" class="notifications-checkbox"/>
            <label for="checkbox2-notification"/>
          </div>
        </div>

        <div class="settings-list__row">
          <label for="checkbox3" class="settings-list__cell">
            добавление моих текстов в&nbsp;коллекции
          </label>
          <div class="settings-list__cell">
            <input type="checkbox" name="checkbox3" id="checkbox3"/>
            <label for="checkbox3"/>
          </div>
          <div class="settings-list__cell">
            <input type="checkbox" name="checkbox3-notification" id="checkbox3-notification" class="notifications-checkbox"/>
            <label for="checkbox3-notification"/>
          </div>
        </div>

        <div class="settings-list__row">
          <h2>Мои подписки</h2>
        </div>

        <div class="settings-list__row">
          <label for="checkbox4" class="settings-list__cell">
            добавление моих текстов в&nbsp;коллекции
          </label>
          <div class="settings-list__cell">
            <input type="checkbox" name="checkbox4" id="checkbox4"/>
            <label for="checkbox4"/>
          </div>
          <div class="settings-list__cell">
            <input type="checkbox" name="checkbox4-notification" id="checkbox4-notification" class="notifications-checkbox"/>
            <label for="checkbox4-notification"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedSettings
