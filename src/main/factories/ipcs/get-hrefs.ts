import { BrowserWindow, app, ipcMain } from 'electron'
// import pie from 'puppeteer-in-electron'
import puppeteer from 'puppeteer-core'
import Bottleneck from 'bottleneck'

import { ScrapeEventByIPC } from 'shared/types'
import { extractEmailsFromUrl } from 'shared/utils/extract-emails'

// Initialize a rate limiter
const limiter = new Bottleneck({
  minTime: 1000, // Minimum time between requests in milliseconds (1 request per second)
  maxConcurrent: 1, // Maximum number of concurrent requests
})

export function getHrefs({ channel, callback }: ScrapeEventByIPC) {
  ipcMain.handle(channel, async (event, ...args) => {
    // const window = await createWindow()
    const [searchTerm, numResults = 10] = args

    const url = `https://www.google.com/search?q=${encodeURIComponent(
      searchTerm
    )}?num=${numResults}`

    const browser = await puppeteer.launch({
      executablePath: puppeteer.executablePath('chrome'), // Or specify the path to your Chromium binary
      headless: true,
    })
    const page = await browser.newPage()
    await page.goto(url)
    const hrefs = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a')).map(
        (anchor) => anchor.href
      )
    })

    // const emails = new Set()
    // // Use the limiter to add rate limiting to the extraction process
    // for (const url of urls) {
    //   await limiter.schedule(async () => {
    //     const urlEmails = await extractEmailsFromUrl(url)
    //     urlEmails.forEach((email) => emails.add(email))
    //   })
    // }

    // console.info('emails', Array.from(emails))

    // window!.destroy()
    // await browser.close()

    // window!.on('closed', () => (window = null))

    // callback && callback(event, { hrefs })
    return hrefs
  })
}
