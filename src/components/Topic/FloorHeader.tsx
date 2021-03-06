import { useI18n } from '@solid-primitives/i18n'
import { NavLink } from 'solid-app-router'
import { Topic } from '../../graphql/types.gen'
import Icon from '../Nav/Icon'
import './FloorHeader.scss'

export default (props: { topic: Topic; color: string }) => {
  const [t] = useI18n()
  return (
    <>
      <h3 class='col-sm-6'>{props.topic.title}</h3>
      <div class='col-sm-6 all-materials'>
        <NavLink href={`/topic/${props.topic.slug}`}>
          {t('All posts')}
          <Icon name={`arrow-right-${props.color}`} />
        </NavLink>
      </div>
    </>
  )
}
