import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { Container, Heading, Button } from 'renderer/components'
import { useWindowStore } from 'renderer/store'
import { ipcMain } from 'electron'

const { App } = window

export function MainScreen() {
  const navigate = useNavigate()
  const store = useWindowStore().scraper

  const [searchTerms, setSearchTerms] = useState('')
  const [showEmails, setShowEmails] = useState(false)

  useEffect(() => {
    App.sayHelloFromBridge()

    // App.whenScraperWindowClose(({ hrefs }) => {
    //   store.setScraperWindowState(false)
    // })
    App.addEmails(({ email }) => {
      store.setScraperStatus(`${store.emails.length} emails found!`)
      store.addEmail(email)
    })
  }, [])

  async function getHrefs() {
    setShowEmails(false)
    // store.setEmails([])

    store.setFetchStatus(true)
    store.setScraperStatus('Searching for links...')

    const hrefs = await App.getHrefs(searchTerms)
    store.setScraperStatus(`${hrefs.length} links found!`)
    store.setHrefs(hrefs)

    store.setFetchStatus(false)
    setSearchTerms('')
  }

  async function findEmails() {
    store.setScraperStatus('Grabbing emails...')
    App.findEmails(store.hrefs)
    setShowEmails(true)
  }

  return (
    <Container>
      <Heading>Welcome to the Email Grabber 👋</Heading>
      <h2 className="font-bold">Search the web for emails</h2>
      <p>1. Enter a search query 🔍</p>
      <p>2. Click GET LINKS to get search links 🔗</p>
      <p>3. Click FIND EMAILS to grab emails. 🫱</p>
      <input
        type="text"
        placeholder="Enter your search terms"
        className="input border border-gray-500 p-4"
        value={searchTerms}
        onChange={(e) => setSearchTerms(e.target.value)}
      />
      <div className="flex justify-between">
        <Button onClick={getHrefs}>{`Get ${searchTerms} links`}</Button>
        <Button
          disabled={store.isFetching || store.hrefs.length === 0}
          onClick={findEmails}
        >{`Find emails`}</Button>
      </div>
      <ul>
        {<li className="font-bold">{store.status}</li>}

        {(!showEmails &&
          store.hrefs.map((href, index) => (
            <li key={`link-${index}`}>{href}</li>
          ))) || <></>}

        {showEmails &&
          store.emails.map((email, index) => (
            <li key={`email-${index}`}>{email}</li>
          ))}
      </ul>
    </Container>
  )
}
