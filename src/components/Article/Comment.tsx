import './Comment.scss'
import Icon from '../Nav/Icon'
import MD from './MD'
import AuthorCard from '../Author/Card'
import { Show } from 'solid-js/web'
import { useStore } from '~/store'
// import dayjs from 'dayjs'
// import 'dayjs/locale/ru'

// dayjs.locale('ru')
// {dayjs(comment.createdAt).format('D MMMM YYYY в HH:MM')}
export default (props) => {
  const store = useStore()
  const state = store[0]
  const { createComment, deleteComment, loadComments } = store[1]
  const { currentUser, articleSlug } = state

  const edit = () => {
    console.log('// TODO: comment editing...')
  }

  const remove = (commentId) => {
    console.log('comment: removing')
    deleteComment(commentId)
  }
  const share = () => {
    console.log('// TODO: comment share...')
  }
  const report = () => {
    console.log('// TODO: comment report...')
  }

  return (
    <div class={`comment${props.level ? ` comment--level-${props.level.toString()}` : ''}`}>
      <Show when={props.comment}>
        <div class='shout-controls'>
          <div class='shout-author'>
            <AuthorCard author={props.comment.author} settings={{}} />
          </div>
          <div class='shout-date'>{props.comment.createdAt}</div>
          {/* <div class="shout-rating">{comment.rating}</div> */}
        </div>
        <div class='shout-body' contenteditable={props.canEdit}>
          <MD body={props.comment.body} />
        </div>
        <div class='comment-controls'>
          <button class='comment-control comment-control--reply'>
            <Icon name='reply' />
            Ответить
          </button>
          <Show when={props.canEdit}>
            <button class='comment-control comment-control--edit' onClick={edit}>
              <Icon name='edit' />
              Редактировать
            </button>
            <button class='comment-control comment-control--delete' onClick={remove}>
              <Icon name='delete' />
              Удалить
            </button>
          </Show>
          <button class='comment-control comment-control--share' onClick={share}>
            Поделиться
          </button>
          <button class='comment-control comment-control--complain' onClick={report}>
            Пожаловаться
          </button>
        </div>
      </Show>
    </div>
  )
}
