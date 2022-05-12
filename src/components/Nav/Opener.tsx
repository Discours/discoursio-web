import { useStore } from "../../store"

export default (props: { name: string, children: any }) => {
    const [, { openModal }] = useStore()
    return <a href='#' onClick={() => openModal(props.name)}>{props.children}</a>
}