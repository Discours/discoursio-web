import { ySyncPlugin, yCursorPlugin, yUndoPlugin } from 'y-prosemirror'
import { ProseMirrorExtension } from '../state'
import { YOptions } from '../context'

export const cursorBuilder = (user: any): HTMLElement => {
  const cursor = document.createElement('span')

  cursor.classList.add('ProseMirror-yjs-cursor')
  cursor.setAttribute('style', `border-color: ${user.background}`)
  const userDiv = document.createElement('span')

  userDiv.setAttribute('style', `background-color: ${user.background}; color: ${user.foreground}`)
  userDiv.textContent = user.name
  cursor.append(userDiv)

  return cursor
}

export default (y: YOptions): ProseMirrorExtension => ({
  // eslint-disable-next-line no-confusing-arrow
  plugins: (prev) =>
    y
      ? [
          ...prev,
          ySyncPlugin(y.type),
          // @ts-ignore
          yCursorPlugin(y.provider.awareness, { cursorBuilder }),
          yUndoPlugin()
        ]
      : prev
})
