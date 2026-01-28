import { FOREGROUND, HIGHLIGHT } from 'auto-console-group'

import { info } from '../console'

export default function visibilityObserver(callback) {
  const observer = new IntersectionObserver(
    (entries) => {
      // DEBUG-PCI: Log all entries before calling callback
      console.log('[DEBUG-PCI IntersectionObserver] entries:', entries.map((e, i) => ({
        index: i,
        target: e.target.tagName,
        isIntersecting: e.isIntersecting,
        intersectionRatio: e.intersectionRatio,
        boundingClientRect: e.boundingClientRect,
        rootBounds: e.rootBounds
      })))
      // FIX: Use LAST entry (most recent state), not first entry
      // IntersectionObserver batches multiple state changes chronologically
      // entries[0] may be a transient state during DOM manipulation
      const lastEntry = entries.at(-1);
      console.log('[DEBUG-PCI IntersectionObserver] Using last entry:', lastEntry.isIntersecting, '(of', entries.length, 'entries)')
      callback(lastEntry.isIntersecting)
    },
    {
      threshold: 0,
    },
  )

  const target = document.documentElement
  observer.observe(target)

  info('Attached%c VisibilityObserver%c to page', HIGHLIGHT, FOREGROUND)

  return {
    disconnect: () => {
      observer.disconnect()
      info('Detached%c VisibilityObserver', HIGHLIGHT)
    },
  }
}
