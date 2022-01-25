import { writable } from 'svelte/store'
/*
export const createChannelStore = (channelId) => {
  const { subscribe, set, update } = writable([])
  const baseUrl = window.location.host
  const eventSource = new EventSource(`${baseUrl}/api/listen/${channelId}`)
  eventSource.onmessage = (e) =>
    update((messages) => messages.concat(JSON.parse(e.data)))
  return {
    subscribe,
    reset: () => set([]),
    close: eventSource.close
  }
}
*/
