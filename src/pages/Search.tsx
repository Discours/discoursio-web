import { Show, For, createSignal, createMemo } from 'solid-js'
import { useI18n } from "@solid-primitives/i18n";
import { useRouteData } from "solid-app-router";
import { ZineState } from "../store/zine";
import '../styles/Search.scss';
import {Shout} from "../graphql/types.gen";
import ArticleCard from "../components/Article/Card";
import { byRating } from '../utils/sortby';

export default () => {
  const [t] = useI18n()
  const data = useRouteData<ZineState>()
  const [q, setq] = createSignal(data.args?.q || '')
  const [mode, setMode] = createSignal(data.args?.by || 'relevance')
  const articles = createMemo(() => {
    switch(mode()){
      case 'rating':
        return Object.values(data.articles||{}).sort(byRating)
      case 'positive':
        return Object.values(data.articles||{}).sort(byRating) // FIXME: sort by positive
      case 'relevance':
      case '':
      default:
        let sorted = (Object.values(data.articles as { [slug:string]: Partial<Shout> })||[]).sort(byRating)
        // TODO: byRelevance
        if (q().length > 3) return sorted.filter(
            (a) =>
              a.title?.toLowerCase().includes(q().toLowerCase()) ||
              a.body?.toLowerCase().includes(q().toLowerCase())
            )
        else return sorted
    }
  })
  const handleQueryChange = (ev: any) => {
    setq(ev.target.value)
  }
  const handleSubmit = (ev: any) => {
    ev.preventDefault()
    setMode('')
  }
  return (
    <div class="search-page wide-container">
      <form action="/search" class="search-form row">
        <div class="col-sm-9">
          <input type="search" name="q" onChange={handleQueryChange} placeholder="Введите текст..."/>
        </div>
        <div class="col-sm-3">
          <button class="button" type="submit" onClick={handleSubmit}>{t('Search')}</button>
        </div>
      </form>

      <ul class="view-switcher">
        <li class="selected">
          <a href="?by=relevance" onClick={() => setMode('relevance')}>По релевантности</a>
        </li>
        <li>
          <a href="?by=rating" onClick={() => setMode('rating')}>Сначала популярные</a>
        </li>
        <li>
          <a href="?by=positive" onClick={() => setMode('positive')}>Сначала положительные</a>
        </li>
      </ul>

      <Show when={q()?.length > 3}>
        <Show when={articles()}>
          <h3>Публикации</h3>

          <div class="floor">
            <div class="row">
              <For each={articles() as Partial<Shout>[]}>
                {(a: Partial<Shout>) => (
                  <div class="col-md-3">
                    <ArticleCard article={a}/>
                  </div>
                )}
              </For>

              <div class="col-md-3">
                <a href="#" class="search__show-more">
                  <span class="search__show-more-inner">Смотреть все</span>
                </a>
              </div>
            </div>
          </div>
        </Show>

        <h3>Темы</h3>

        <h3>Авторы</h3>
      </Show>

    </div>
  )
}
