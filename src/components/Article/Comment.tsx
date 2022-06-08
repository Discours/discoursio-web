import './Comment.scss'
import Icon from '../Nav/Icon'
import MD from './MD'
import AuthorCard from '../Author/Card'
import { Show } from 'solid-js/web'
import { User } from '../../graphql/types.gen'
import { createSignal } from 'solid-js'
import { useI18n } from '@solid-primitives/i18n'
import { Comment as Point } from '../../graphql/types.gen'
import { useStore } from '../../store'
import { useZine } from '../../store/zine'

export default (props: { level: number; comment: Partial<Point>; canEdit: boolean }) => {
  const [{}, { deleteComment }] = useZine()
  const [{}, { showModal }] = useStore()
  const [t] = useI18n()
  const [comment] = createSignal<Partial<Point>>(props.comment as Partial<Point>)

  const remove = () => {
    console.log('comment: removing')
    !!comment()?.id && deleteComment(comment().id)
  }

  return (
    <div class={`comment${props.level ? ` comment--level-${props.level.toString()}` : ''}`}>
      <Show when={!!comment()}>
        <div class='shout-controls'>
          <div class='shout-author'>
            <AuthorCard author={comment()?.author as Partial<User>} />
          </div>
          <div class='shout-date'>{comment()?.createdAt}</div>
          {/* <div class="shout-rating">{comment.rating}</div> */}
        </div>
        <div class='shout-body' contenteditable={props.canEdit as boolean}>
          <MD body={comment()?.body || ''} />
        </div>
        <div class='comment-controls'>
          <button class='comment-control comment-control--reply'>
            <Icon name='reply' />
            {t('Reply')}
          </button>
          <Show when={props.canEdit}>
            <button class='comment-control comment-control--edit' onClick={() => showModal('editComment')}>
              <Icon name='edit' />
              {t('Edit')}
            </button>
            <button class='comment-control comment-control--delete' onClick={() => remove()}>
              <Icon name='delete' />
              {t('Delete')}
            </button>
          </Show>
          <button class='comment-control comment-control--share' onClick={() => showModal('shareComment')}>
            {t('Share')}
          </button>
          <button
            class='comment-control comment-control--complain'
            onClick={() => showModal('reportComment')}
          >
            {t('Report')}
          </button>
        </div>
      </Show>
    </div>
  )
}
