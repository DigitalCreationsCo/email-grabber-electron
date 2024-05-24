import { ipcRenderer } from 'electron'

import { IPC } from 'shared/constants'

export function whenScraperWindowClose(fn: (...args: any[]) => void) {
  const channel = IPC.WINDOWS.SCRAPER.WHEN_SCRAPER_CLOSE

  ipcRenderer.on(channel, (_, ...args) => {
    fn(...args)
  })
}
