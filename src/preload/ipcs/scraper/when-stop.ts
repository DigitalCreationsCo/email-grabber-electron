import { ipcRenderer } from 'electron'
import { IPC } from 'shared/constants'
import { ScrapeEventByIPC } from 'shared/types'

export function whenScraperStop(
  fn: (...args: ScrapeEventByIPC['callback']['arguments']) => void
) {
  const channel = IPC.WINDOWS.SCRAPER.WHEN_SCRAPER_STOP

  ipcRenderer.on(channel, (_, ...args) => {
    fn(...args)
  })
}
