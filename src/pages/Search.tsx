import { Show, For, createSignal, createEffect } from 'solid-js'
import { useI18n } from "@solid-primitives/i18n";
import { useRouteData } from "solid-app-router";
import { ZineState } from "../store/zine";
import './Search.scss';
import {Shout} from "../graphql/types.gen";
import ArticleCard from "../components/Article/Card";

export default () => {
  const [t] = useI18n()
  const data = useRouteData<ZineState>()
  const [articles, setArticles] = createSignal<Partial<Shout>[]>([])

  createEffect(() => {
    if (data.articles) {
      setArticles(data.articles.slice(0, 3));
    }
  });

  return (
    <div class="search-page wide-container">
      <form action="." class="search-form row">
        <div class="col-sm-9">
          <input type="search" name="search" placeholder="Введите текст..."/>
        </div>
        <div class="col-sm-3">
          <button class="button" type="submit">Найти</button>
        </div>
      </form>

      <ul class="view-switcher">
        <li class="selected">
          <a href="#">По релевантности</a>
        </li>
        <li>
          <a href="#">Сначала популярные</a>
        </li>
        <li>
          <a href="#">Сначала положительные</a>
        </li>
      </ul>

      <h3>Публикации</h3>

      <div class="floor">
        <div class="row">
          <Show when={articles()}>
            <For each={articles() as Partial<Shout>[]}>
              {(a: Partial<Shout>) => (
                <ArticleCard article={a} settings={{isFeedMode: true}} />
              )}
            </For>
          </Show>

          <div class="col-md-3">
            <section class="shout-card ">
              <div class="shout-card__cover-container">
                <div class="shout-card__cover"><img loading="lazy"
                                                    src="https://assets.discours.io/unsafe/1600x/production/image/fc011d30-f3be-11ec-ac22-7fc5c3b90307.jpg"
                                                    alt="Фотохроника четвёртого месяца войны в Украине. 100 главных снимков об искалеченных судьбах и потерянном детстве"/>
                </div>
              </div>
              <div class="shout-card__content">
                <div class="shout__topic"><a class="active" aria-current="page"
                                             href="/topic/social">social</a></div>
                <div class="shout-card__title"><a class="inactive" href="/war-fourth-month-100-photos">Фотохроника
                  четвёртого месяца войны в Украине</a></div>
                <div class="shout-card__subtitle">100 главных снимков об искалеченных судьбах и потерянном
                  детстве
                </div>
                <div class="shout__author"><a class="inactive" href="/author/discours">Discours</a></div>
              </div>
            </section>
          </div>
          <div class="col-md-3">
            <section class="shout-card ">
              <div class="shout-card__cover-container">
                <div class="shout-card__cover"><img loading="lazy"
                                                    src="https://assets.discours.io/unsafe/1600x/production/image/ca4dadf0-f132-11ec-b322-c34ee572358e.JPG"
                                                    alt="«Общество не имеет права претендовать на моё тело и мою жизнь». Карен Шаинян о государственном контроле и личной свободе"/>
                </div>
              </div>
              <div class="shout-card__content">
                <div class="shout__topic"><a class="active" aria-current="page"
                                             href="/topic/social">social</a></div>
                <div class="shout-card__title"><a class="inactive" href="/karen-shainyan-interview">«Общество
                  не имеет права претендовать на моё тело и мою жизнь»</a></div>
                <div class="shout-card__subtitle">Карен Шаинян о государственном контроле и личной
                  свободе
                </div>
                <div class="shout__author"><a class="inactive" href="/author/sofya-getts">Sofiya Getts</a>
                </div>
              </div>
            </section>
          </div>
          <div class="col-md-3">
            <section class="shout-card ">
              <div class="shout-card__cover-container">
                <div class="shout-card__cover"><img loading="lazy"
                                                    src="https://assets.discours.io/unsafe/1600x/production/image/1f1a0450-f14c-11ec-acce-21b624ae881f.jpg"
                                                    alt="Секретная встреча российской оппозиции. Как прошёл «Форум мирной России» о будущем страны без Путина"/>
                </div>
              </div>
              <div class="shout-card__content">
                <div class="shout__topic"><a class="active" aria-current="page"
                                             href="/topic/social">social</a></div>
                <div class="shout-card__title"><a class="inactive" href="/what-is-peace-russia-forum">Секретная
                  встреча российской оппозиции</a></div>
                <div class="shout-card__subtitle">Как прошёл «Форум мирной России» о будущем страны без
                  Путина
                </div>
                <div class="shout__author"><a class="inactive" href="/author/blackbox">Chernyy Yaschik</a>
                </div>
              </div>
            </section>
          </div>

          <div class="col-md-3">
            <a href="#" class="search__show-more">
              <span class="search__show-more-inner">Смотреть все</span>
            </a>
          </div>
        </div>
      </div>

      <h3>Темы</h3>

      <h3>Авторы</h3>

    </div>
  )
}
