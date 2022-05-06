import { useStore } from '../../store'
import { User } from '../../graphql/types.gen'
import ArticleList from '../Article/List'
import AuthorCard from './Card'

export default (props: { author: Partial<User> }) => {
  const [, { authorArticles }] = useStore()

  return (
    <>
      <div class='container'>
        <div class='row'>
          <div class='user-details'>
            <AuthorCard author={props.author} compact={false} canFollow={true} />
          </div>
        </div>
      </div>
      <ArticleList articles={authorArticles()} size={10} page={0} />
    </>
  )
}
