import { app, ipcMain } from 'electron'

import { makeAppSetup, makeAppWithSingleInstanceLock } from './factories'
import {
  MainWindow,
  registerAboutWindowCreationByIPC,
  registerScraperHandler,
  registerExportHandler,
} from './windows'
import { IPC } from 'shared/constants'

makeAppWithSingleInstanceLock(async () => {
  ;(await import('electron-dl')).default()
  await app.whenReady()
  const window = await makeAppSetup(MainWindow)

  const { download, CancelError } = await import('electron-dl')
  ipcMain.on(IPC.WINDOWS.EXPORT.DOWNLOAD, async (event, { url }) => {
    try {
      console.log(await download(window, url))
    } catch (error) {
      if (error instanceof CancelError) {
        console.info('item.cancel() was called')
      } else {
        console.error(error)
      }
    }
  })

  registerAboutWindowCreationByIPC()
  registerScraperHandler()
  registerExportHandler()
})
