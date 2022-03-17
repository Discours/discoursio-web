import ArticleCard from './Card'

export default (props) => (
  <div class='floor floor--one-article'>
    <div class='wide-container row'>
      <div class='col-12'>
        <ArticleCard article={props.article} />
      </div>
    </div>
  </div>
)
