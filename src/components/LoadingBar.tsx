import { Component } from 'solid-js'

const PageLoadingBar: Component<{
  active: boolean
}> = (props) => {
  const duration = 8000
  // delay property is not included, instead its within keyframes in order to work with Safari
  const animationName = 'Page-Loading-Bar'

  return (
    <div class='absolute z-50 w-full overflow-hidden pointer-events-none' style={`top: 0; height: 6px;`}>
      <div
        style={{
          width: '100%',
          height: '100%',
          animation: props.active ? `${animationName} ${duration}ms infinite` : 'none',
          'transform-origin': 'left',
          transform: 'translateX(-100%)',
          background: '#000'
        }}
      ></div>
    </div>
  )
}

export default PageLoadingBar
