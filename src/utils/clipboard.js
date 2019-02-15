import Clipboard from 'clipboard'

export default function handleClipboard(text, event) {
  return new Promise((resolve, reject) => {
    const clipboard = new Clipboard(event.target, {
      text: () => text
    })
    clipboard.on('success', () => {
      clipboard.off('error')
      clipboard.off('success')
      clipboard.destroy()
      resolve(true)
    })
    clipboard.on('error', () => {
      clipboard.off('error')
      clipboard.off('success')
      clipboard.destroy()
      reject(false)
    })
    clipboard.onClick(event)
  })
}
