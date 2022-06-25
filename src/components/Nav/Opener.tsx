import { useStore } from '../../store'

export default (props: { name: string; children: any }) => {
  const [, { showModal }] = useStore()
  return (
    <a href='#' onClick={() => showModal(props.name)}>
      {props.children}
    </a>
  )
}
