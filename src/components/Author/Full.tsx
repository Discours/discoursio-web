import { useStore } from '../../store'
import { User } from '../../graphql/types.gen'
import AuthorCard from './Card'

export default (props: { author: Partial<User> }) => {
  const [ { info }, ] = useStore()
  return (
    <>
      <div class='container'>
        <div class='row'>
          <div class='user-details'>
            <AuthorCard author={props.author} compact={false} canFollow={true} />
          </div>
        </div>
      </div>
    </>
  )
}
