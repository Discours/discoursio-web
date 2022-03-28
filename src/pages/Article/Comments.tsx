import { For, onMount, Show, Suspense } from "solid-js";
import { createStore } from 'solid-js/store'
import NavLink from '../../components/NavLink'
import ListErrors from '../../components/ListErrors'
import { useStore } from '../../store'

const Comment = (props) => {
  return (
    <div class='card'>
      <div class='card-block'>
        <p class='card-text' textContent={props.comment.body} />
      </div>
      <div class='card-footer'>
        <NavLink href={`@${props.comment.author.username}`} route='profile' class='comment-author'>
          <img src={props.comment.author.image} class='comment-author-img' alt='' />
        </NavLink>
        &nbsp;
        <NavLink href={`@${props.comment.author.username}`} route='profile' class='comment-author'>
          {props.comment.author.username}
        </NavLink>
        <span class='date-posted'>{new Date(props.comment.createdAt).toDateString()}</span>
        {<Show when={props.currentUser && props.currentUser.username === props.comment.author.username}>{<span class='mod-options'>
            <i class='ion-trash-a' onClick={[props.onDelete, props.comment.id]} />
          </span>}</Show>}
      </div>
    </div>
  )
}

const CommentInput = (props) => {
  const [state, setState] = createStore({ body: '', isCreatingComment: false, errors: [] });
    const handleBodyChange = (ev) => setState({ body: ev.target.value });
    const createCommentHandler = (ev) => {
      ev.preventDefault()
      setState({ isCreatingComment: true })
      props.createComment({ body: state.body })
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
  const state = useStore();
  const store = state[0]
  const { createComment, deleteComment, loadComments } = state[1];
    const { currentUser, articleSlug } = store;
    const handleDeleteComment = (commentId) => deleteComment(commentId)

  return (
    <div class='col-xs-12 col-md-8 offset-md-2'>
      {<Show when={currentUser} fallback={<p>
          <NavLink route='login'>Sign in</NavLink>
          &nbsp;or&nbsp;
          <NavLink route='register'>sign up</NavLink>
          &nbsp;to add comments on this article.
        </p>}>{<CommentInput
          slug={articleSlug}
          currentUser={currentUser}
          createComment={createComment}
          loadComments={loadComments}
        />}</Show>}
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
