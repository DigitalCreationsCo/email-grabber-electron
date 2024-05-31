import { ipcMain } from 'electron'
// import pie from 'puppeteer-in-electron'
import Bottleneck from 'bottleneck'

import { ScrapeEventByIPC } from 'shared/types'
import { extractEmailsFromUrl } from 'shared/utils/extract-emails'
import { IPC } from 'shared/constants'

// Initialize a rate limiter
const limiter = new Bottleneck({
  minTime: 1000, // Minimum time between requests in milliseconds (1 request per second)
  maxConcurrent: 1, // Maximum number of concurrent requests
})

export function findEmails({ callback }: ScrapeEventByIPC) {
  let controller: AbortController
  ipcMain.handle(IPC.WINDOWS.SCRAPER.STOP_SCRAPE, async () => {
    controller.abort()
  })

  ipcMain.handle(IPC.WINDOWS.SCRAPER.FIND_EMAILS, async (event, ...args) => {
    controller = new AbortController()
    const signal = controller.signal
    const [hrefs, headers] = args

    let emails = new Set<string>()
    try {
      for (const url of hrefs) {
        console.info('extracting from url: ', url)
        // Use the limiter to add rate limiting to the extraction process
        await limiter.schedule(async () => {
          emails = await extractEmailsFromUrl(emails, url, signal)

          callback(event, {
            channel: IPC.WINDOWS.SCRAPER.RETURN_EMAILS,
            emails: Array.from(emails),
          })
        })
      }
    } catch (error) {
      if (error.message === 'canceled') {
        callback(event, {
          channel: IPC.WINDOWS.SCRAPER.WHEN_SCRAPER_STOP,
          emails: Array.from(emails),
          message: 'DONE',
        })
      } else {
        console.error('An error occurred:', error)
      }
    }

    callback(event, {
      channel: IPC.WINDOWS.SCRAPER.WHEN_SCRAPER_STOP,
      emails: Array.from(emails),
      message: 'DONE',
    })
  })
}
