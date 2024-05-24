import { ipcMain } from 'electron'

import { findEmails, getHrefs } from 'main/factories'
import { IPC } from 'shared/constants'

export function registerScraperHandler() {
  getHrefs({
    channel: IPC.WINDOWS.SCRAPER.GET_HREFS,
    callback({ sender }, { hrefs }) {
      sender.send(IPC.WINDOWS.SCRAPER.GET_HREFS, {
        hrefs,
      })
    },
  })

  findEmails({
    channel: IPC.WINDOWS.SCRAPER.FIND_EMAILS,
    callback({ sender }, { email }) {
      const channel = IPC.WINDOWS.SCRAPER.RETURN_EMAILS
      sender.send(channel, { email })
    },
  })
}
