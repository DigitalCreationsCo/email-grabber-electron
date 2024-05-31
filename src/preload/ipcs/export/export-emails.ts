import { ipcRenderer } from 'electron'
import { IPC } from 'shared/constants'

export async function exportEmails(...args: any[]) {
  const url = await ipcRenderer.invoke(IPC.WINDOWS.EXPORT.EMAILS, ...args)
  const payload = { url }
  ipcRenderer.send(IPC.WINDOWS.EXPORT.DOWNLOAD, payload)
}
