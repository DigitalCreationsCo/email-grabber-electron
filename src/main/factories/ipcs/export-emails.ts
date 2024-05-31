import { ipcMain } from 'electron'
import { IPC } from 'shared/constants'
import { createCSVFile } from 'shared/utils/create-csv-file'

export function exportEmails() {
  ipcMain.handle(IPC.WINDOWS.EXPORT.EMAILS, async (event, ...args) => {
    const [emails] = args
    const blob = createCSVFile(emails)
    return blob
  })
}
