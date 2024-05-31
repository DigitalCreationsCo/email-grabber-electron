import { ipcMain } from 'electron'
import puppeteer from 'puppeteer-core'
import Bottleneck from 'bottleneck'

import { ScrapeEventByIPC, GetHrefsArgs } from 'shared/types'
import { IPC } from 'shared/constants'
import { defaultKeywords } from 'shared/constants/defaultKeywords'
import { defaultHeaders } from 'shared/constants/defaultHeaders'

// Initialize a rate limiter
const limiter = new Bottleneck({
  minTime: 1000, // Minimum time between requests in milliseconds (1 request per second)
  maxConcurrent: 1, // Maximum number of concurrent requests
})

export function getHrefs({ callback }: ScrapeEventByIPC) {
  ipcMain.handle(IPC.WINDOWS.SCRAPER.GET_HREFS, async (event, ...args) => {
    let [searchTerm = '', numResults = 80, keywords = []] =
      args as unknown as GetHrefsArgs

    keywords = [...defaultKeywords, ...keywords]

    const url = `https://www.google.com/search?q=${
      searchTerm ? encodeURIComponent(`${searchTerm}&num=${numResults}`) : ''
    }`

    const browser = await puppeteer.launch({
      executablePath: puppeteer.executablePath('chrome'), // Or specify the path to your Chromium binary
      headless: true,
    })

    const page = await browser.newPage()
    await page.setExtraHTTPHeaders({ ...defaultHeaders })

    await page.goto(url)
    const hrefs = await page.evaluate((keywords) => {
      return Array.from(document.querySelectorAll('a'))
        .map((anchor) => anchor.href)
        .filter(
          (href) => href && !keywords.some((keyword) => href.includes(keyword))
        )
    }, keywords)

    return hrefs
  })
}
