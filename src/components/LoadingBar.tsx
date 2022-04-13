import { Component } from 'solid-js'

const PageLoadingBar: Component<{
  postion?: 'top' | 'bottom'
  active: boolean
}> = (props) => {
  const duration = 8000
  // delay property is not included, instead its within keyframes in order to work with Safari
  const animationName = 'Page-Loading-Bar'
  // eslint-disable-next-line no-confusing-arrow
  const animationValue = () => (props.active ? `${animationName} ${duration}ms infinite` : 'none')

  return (
    <div
      class='absolute z-50 w-full overflow-hidden pointer-events-none'
      style={`${props.postion}: 0; height: ${props.postion === 'top' ? '6px' : '10px'};`}
    >
      <div
        class='w-full h-full'
        style={`background: #000; transform: translateX(-100%); animation: ${animationValue()}; transform-origin: left; `}
      ></div>
    </div>
  )
}

export default PageLoadingBar
