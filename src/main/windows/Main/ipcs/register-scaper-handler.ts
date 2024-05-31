import { ipcMain } from 'electron'
import { findEmails, getHrefs } from 'main/factories'
import { IPC } from 'shared/constants'

export function registerScraperHandler() {
  getHrefs({
    callback({ sender }, { channel, hrefs }) {
      sender.send(channel, {
        hrefs,
      })
    },
  })

  findEmails({
    callback({ sender }, { channel, ...args }) {
      if (channel === IPC.WINDOWS.SCRAPER.WHEN_SCRAPER_STOP) {
        ipcMain.removeHandler(channel)
      }
      sender.send(channel, { ...args })
    },
  })
}
