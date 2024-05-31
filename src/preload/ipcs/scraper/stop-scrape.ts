import { ipcRenderer } from 'electron'
import { IPC } from 'shared/constants'

export function stopScraping() {
  ipcRenderer.invoke(IPC.WINDOWS.SCRAPER.STOP_SCRAPE)
}
