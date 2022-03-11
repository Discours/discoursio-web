import { For, Show } from 'solid-js'
import { createStore } from 'solid-js/store'
import NavLink from '../../components/NavLink'
import ListErrors from '../../components/ListErrors'
import { useStore } from '../../store'

const Comment = (props) => {
  const show = props.currentUser && props.currentUser.username === props.comment.author.username
  const {
    id,
    body,
    author: { username, image },
    createdAt
  } = props.comment

  return (
    <div class='card'>
      <div class='card-block'>
        <p class='card-text' textContent={body} />
      </div>
      <div class='card-footer'>
        <NavLink href={`@${username}`} route='profile' class='comment-author'>
          <img src={image} class='comment-author-img' alt='' />
        </NavLink>
        &nbsp;
        <NavLink href={`@${username}`} route='profile' class='comment-author'>
          {username}
        </NavLink>
        <span class='date-posted'>{new Date(createdAt).toDateString()}</span>
        {
          <Show when={show}>
            {
              <span class='mod-options'>
                <i class='ion-trash-a' onClick={[props.onDelete, id]} />
              </span>
            }
          </Show>
        }
      </div>
    </div>
  )
}

const CommentInput = (props) => {
  const [state, setState] = createStore({ body: '' })
  const handleBodyChange = (ev) => setState({ body: ev.target.value })
  const createCommentHandler = (ev) => {
    ev.preventDefault()
    setState({ isCreatingComment: true })
    props
      .createComment({ body: state.body })
      .then(() => {
        setState({ body: '' })
        props.loadComments(props.slug, true)
      })
      .catch((errors) => setState({ errors }))
      .finally(() => setState({ isCreatingComment: false }))
  }

  return (
    <>
      <ListErrors errors={state.errors} />
      <form class='card comment-form' onSubmit={createCommentHandler}>
        <div class='card-block'>
          <textarea
            class='form-control'
            placeholder='Write a comment...'
            value={state.body}
            disabled={state.isCreatingComment}
            onChange={handleBodyChange}
            rows='3'
          />
        </div>
        <div class='card-footer'>
          <img src={props.currentUser.image} class='comment-author-img' alt='' />
          <button class='btn btn-sm btn-primary' type='submit'>
            Post Comment
          </button>
        </div>
      </form>
    </>
  )
}

export default () => {
  const [store, { createComment, deleteComment, loadComments }] = useStore()
  const { currentUser, articleSlug } = store
  const handleDeleteComment = (commentId) => deleteComment(commentId)

  return (
    <div class='col-xs-12 col-md-8 offset-md-2'>
      {
        <Show
          when={currentUser}
          fallback={
            <p>
              <NavLink route='login'>Sign in</NavLink>
              &nbsp;or&nbsp;
              <NavLink route='register'>sign up</NavLink>
              &nbsp;to add comments on this article.
            </p>
          }
        >
          {
            <CommentInput
              slug={articleSlug}
              currentUser={currentUser}
              createComment={createComment}
              loadComments={loadComments}
            />
          }
        </Show>
      }
      <Suspense fallback='Loading comments'>
        <For each={store.comments}>
          {(comment) => (
            <Comment comment={comment} currentUser={currentUser} onDelete={handleDeleteComment} />
          )}
        </For>
      </Suspense>
    </div>
  )
}
