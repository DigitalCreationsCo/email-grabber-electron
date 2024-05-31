import { BrowserWindow } from 'electron'
import { join } from 'path'

import { ENVIRONMENT, IPC } from 'shared/constants'
import { createWindow } from 'main/factories'
import { displayName } from '~/package.json'

export * from './ipcs'

export async function MainWindow() {
  const window = createWindow({
    id: 'main',
    title: displayName,
    width: 900,
    height: 673,
    show: false,
    center: true,
    movable: true,
    resizable: false,
    alwaysOnTop: false,
    autoHideMenuBar: true,

    webPreferences: {
      nodeIntegration: true,
      preload: join(__dirname, '../preload/index.js'),
    },
  })

  window.webContents.on('did-finish-load', () => {
    if (ENVIRONMENT.IS_DEV) {
      window.webContents.openDevTools({ mode: 'detach' })
    }

    window.show()
  })

  window.on('close', () =>
    BrowserWindow.getAllWindows().forEach((window) => window.destroy())
  )

  return window
}
