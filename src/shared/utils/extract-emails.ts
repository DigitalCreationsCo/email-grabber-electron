import axios from 'axios'
import * as cheerio from 'cheerio'

export async function extractEmailsFromUrl(url: string) {
  const emails = new Set()
  try {
    const { data } = await axios.get(url)
    const $ = cheerio.load(data)
    const text = $('body').text()
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
    const foundEmails = text.match(emailPattern) || []
    foundEmails.forEach((email) => emails.add(email))
  } catch (error) {
    console.error(`Failed to scrape ${url}: ${error.message}`)
  }
  return emails
}
