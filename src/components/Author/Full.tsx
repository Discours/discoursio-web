import { User } from '../../graphql/types.gen'
import AuthorCard from './Card'
import './Full.scss'

export default (props: { author: Partial<User> }) => {
  return (
    <>
      <div class='container'>
        <div class='row'>
          <div class='user-details'>
            <AuthorCard author={props.author} compact={false} />
          </div>
        </div>
      </div>
    </>
  )
}
