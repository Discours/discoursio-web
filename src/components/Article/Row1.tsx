import { Shout } from '../../graphql/types.gen'
import ArticleCard from './Card'

export default (props: { article: Partial<Shout> }) => (
  <div class='floor floor--one-article'>
    <div class='wide-container row'>
      <div class='col-12'>
        <ArticleCard article={props.article} />
      </div>
    </div>
  </div>
)
