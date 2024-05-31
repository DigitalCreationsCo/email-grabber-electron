import { ipcRenderer } from 'electron'
import { IPC } from 'shared/constants'

export function addEmails(fn: (...args: any) => void) {
  ipcRenderer.on(IPC.WINDOWS.SCRAPER.RETURN_EMAILS, (_, ...args) => {
    fn(...args)
  })
}
