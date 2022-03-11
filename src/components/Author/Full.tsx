import { useStore } from '~/store'
import ArticleList from '../Article/List'
import AuthorCard from './Card'

export default (props) => {
  const store = useStore()
  const state = store[0]
  const { authorArticles } = store[1]

  return (
    <>
      <div class='container'>
        <div class='row'>
          <div class='user-details'>
            <AuthorCard author={props.author} settings={{ hasFullInfo: true, hasSubscribeButton: true }} />
          </div>
        </div>
      </div>
      <ArticleList articles={authorArticles()} totalPagesCount={1} currentPage={0} onSetPage={() => {}} />
    </>
  )
}
