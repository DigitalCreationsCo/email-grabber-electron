import { ipcRenderer } from 'electron'
import { IPC } from 'shared/constants'

export function findEmails(...args: any[]) {
  ipcRenderer.invoke(IPC.WINDOWS.SCRAPER.FIND_EMAILS, ...args)
}
