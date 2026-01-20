import { info } from '../console'

export default function visibilityObserver(callback) {
  const observer = new IntersectionObserver(
    (entries) => callback(entries.at(-1).isIntersecting),
    {
      threshold: 0,
    },
  )

  const target = document.documentElement
  observer.observe(target)

  info('Attached VisibilityObserver to page')

  return {
    disconnect: () => {
      observer.disconnect()
      info('Detached VisibilityObserver')
    },
  }
}
