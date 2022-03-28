import { Show, createSignal, onMount } from 'solid-js'
// import { IndexeddbPersistence } from 'y-indexeddb'
import { Awareness } from 'y-protocols/awareness'
import { WebrtcProvider } from 'y-webrtc'
import { XmlFragment, logUpdate } from 'yjs'

let p2p

export default (props) => {
  const [loading, setLoading] = createSignal()
  const [swarm, setSwarm] = createSignal('TEST') // FIXME

  onMount(() => {
    // TODO: generate room name
    setSwarm(`discours-fake-room-${Date.now()}`)
    console.log(`p2p: room is ${swarm()}`)

    p2p = new WebrtcProvider(swarm(), props.ydoc, {
      awareness: new Awareness(props.ydoc),
      filterBcConns: true,
      maxConns: 33,
      signaling: [
        // 'wss://signaling.discours.io',
        // 'wss://stun.l.google.com:19302',
        'wss://y-webrtc-signaling-eu.herokuapp.com',
        'wss://signaling.yjs.dev'
      ],
      peerOpts: {},
      password: ''
    })
    console.log('p2p: webrtc provider initialized')

    // init db
    // const db = new IndexeddbPersistence(swarm(), props.ydoc)

    console.log('p2p: indexed db persistence connected')
    // connect p2p
    p2p.connect()
    props.onConnected(p2p)
    console.log('p2p: connected')
    // sync db
    /*
    db.on('synced', () => {
      const up = db.doc.getXmlFragment(`${swarm()}-body`)

      if (props.body !== up && up.length > 0) {
        body = up
        console.log('p2p: body updated')
      }

      setLoading(false)
    })
    */
    p2p.doc.on('update', logUpdate)

    const remote = props.ydoc.getXmlFragment(`${swarm()}-body`)
    const local = props.body === '' ? new XmlFragment() : props.body

    if (remote === local) {
      console.log('p2p: no conflict to solve')
      // body = remote
    } else {
      // TODO: implement conflict solving logix
      // если ты редактор - правишь как обычно
      // если ты не редактор - все правки становятся предложениями (proposal)
      console.log('p2p: conflict solving is not implemented yet')
    }
  })

  return (
    <Show when={p2p?.roomName && !loading()}>
      <small class='room'>{p2p.roomName}</small>
    </Show>
  )
}
