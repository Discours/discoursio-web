import './Tooltip.scss'
import { Component, createSignal } from "solid-js"

export const Tooltip: Component = (props: any) => {
  const [isShown, setShowed] = createSignal(false)
  const show = () => setShowed(true)
  return (
    
    <span>
      <a href={props.link ? props.link : '#'} class='tooltip' onClick={show}>&zwnj;</a>
      <div class='tooltip-content' classList={{ hidden: !isShown() }} >
        {props.children}
      </div>
    </span>

  )
}

export default Tooltip