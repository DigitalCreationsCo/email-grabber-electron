import { ipcRenderer } from 'electron'
import { IPC } from 'shared/constants'

export function addEmails(fn: ({ email }: { email: string }) => void) {
  ipcRenderer.on(IPC.WINDOWS.SCRAPER.RETURN_EMAILS, (_, { email }) => {
    fn({ email })
  })
}
