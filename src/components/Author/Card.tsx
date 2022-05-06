import { Show } from "solid-js/web"
import { User } from "../../graphql/types.gen"


interface AuthorCardProps {
  compact?: boolean
  canFollow?: boolean
  author: Partial<User>
}

export default (props: AuthorCardProps) => {
  // TODO: reimplement AuthorCard
  return (<>
    <Show when={!props.compact}>
      
    </Show>
  </>)
}
