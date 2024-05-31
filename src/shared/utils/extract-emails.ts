import axios from 'axios'
import * as cheerio from 'cheerio'
import { defaultHeaders } from 'shared/constants/defaultHeaders'

export async function extractEmailsFromUrl(
  emails: Set<string>,
  url: string,
  signal: AbortSignal,
  headers = {}
) {
  try {
    headers = { ...defaultHeaders, ...headers }

    console.info('get web page: ', url)
    const { data } = await axios.get(url, { signal, headers })
    const $ = cheerio.load(data)
    const text = $('body').text()
    // console.info('data: ', data)
    // console.info('page text: ', text)

    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
    const foundEmails = text.match(emailPattern) || []
    // console.info('found emails: ', foundEmails)

    foundEmails.forEach((email) => emails.add(email))
  } catch (error) {
    console.error('extract emails error: ', error.message)
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error('Response error')
      // console.error('Response error: ', error.response.status)
    } else if (error.request) {
      // No response was received
      console.error('No response received')
      // console.error('No response received: ', error.request)
    } else if (error.message === 'canceled') {
      console.error('User canceled the request. ')
      throw new Error(error.message)
    } else {
      console.error('Request setup error')
      // console.error('Request setup error: ', error.message)
      // console.error(`Failed to scrape ${url}: ${error.message}`)
      // throw new Error(`Failed to scrape ${url}: ${error.message}`)
    }
  }
  return emails
}
