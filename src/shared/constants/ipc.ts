export const IPC = {
  WINDOWS: {
    ABOUT: {
      CREATE_WINDOW: 'windows: create-about-window',
      WHEN_WINDOW_CLOSE: 'windows: when-about-window-close',
    },
    SCRAPER: {
      GET_HREFS: 'scraper: get-hrefs',
      FIND_EMAILS: 'scraper: find-emails',
      RETURN_EMAILS: 'scraper: return-emails',
      STOP_SCRAPE: 'scraper: stop-scrape',
      WHEN_SCRAPER_STOP: 'scraper: when-scraper-stop',
    },
    EXPORT: {
      DOWNLOAD: 'export: download',
      EMAILS: 'export: emails',
    },
  },
}
