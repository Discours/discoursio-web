import { For, Show } from 'solid-js'
import NavLink from '../../components/NavLink'
import ArticleList from '../../components/ArticleList'

export default (props) => {
  return (
    <div class='home-page'>
      <div class='banner'>
        <div class='container'>
          <h1 class='logo-font' textContent={props.appName} />
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div class='container page'>
        <div class='row'>
          <div class='col-md-9'>
            <div class='feed-toggle'>
              <ul class='nav nav-pills outline-active'>
                {
                  <Show when={props.token}>
                    {
                      <li class='nav-item'>
                        <NavLink class='nav-link' href='?tab=feed' active={props.tab() === 'feed'}>
                          Your Feed
                        </NavLink>
                      </li>
                    }
                  </Show>
                }
                <li class='nav-item'>
                  <NavLink class='nav-link' href='?tab=all' active={props.tab() === 'all'}>
                    Global Feed
                  </NavLink>
                </li>
                <Show when={props.tab() !== 'all' && props.tab() !== 'feed'}>
                  <li class='nav-item'>
                    <a href='' class='nav-link active'>
                      <i class='ion-pound' /> {props.tab()}
                    </a>
                  </li>
                </Show>
              </ul>
            </div>

            <ArticleList
              articles={Object.values(props.store.articles)}
              totalPagesCount={props.store.totalPagesCount}
              currentPage={props.store.page}
              onSetPage={props.handleSetPage}
            />
          </div>

          <div class='col-md-3'>
            <div class='sidebar'>
              <p>Popular Topics</p>
              <Suspense fallback='Loading topics...'>
                <div class='topic-list'>
                  <For each={props.store.topics}>
                    {(topic) => (
                      <a href={`#/?tab=${topic}`} class='topic-pill topic-default'>
                        {topic}
                      </a>
                    )}
                  </For>
                </div>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
