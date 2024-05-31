import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Container, Heading, Button } from 'renderer/components'
import { useWindowStore } from 'renderer/store'
import { dialog } from 'electron'

const { App } = window

export function MainScreen() {
  const navigate = useNavigate()
  const store = useWindowStore().scraper

  const [searchTerms, setSearchTerms] = useState('')
  const [showLinks, setShowLinks] = useState(false)

  useEffect(() => {
    App.sayHelloFromBridge()
  }, [])

  useEffect(() => {
    App.whenScraperStop(({ emails, message }) => {
      store.setEmails(emails)
      store.setStatus(`${emails.length} emails found.`)

      if (message && message === 'DONE') {
        store.setIsScraping(false)
      }
    })
  }, [])

  useEffect(() => {
    App.addEmails(({ emails }) => {
      store.setStatus(`Grabbing emails... ${emails.length} emails found.`)
      store.setEmails(emails)
    })
  }, [])

  async function getHrefs() {
    store.setHrefs([])
    setShowLinks(true)
    // store.setEmails([])

    store.setIsFetching(true)
    store.setStatus('Searching for links...')

    const hrefs = await App.getHrefs(searchTerms)
    store.setStatus(`${hrefs.length} links found. Click Find Emails`)
    store.setHrefs(hrefs)

    store.setIsFetching(false)
  }

  async function findEmails() {
    store.setStatus('Grabbing emails...')
    store.setIsScraping(true)
    App.findEmails(store.hrefs)
    setShowLinks(false)
  }

  async function stopFindingEmails() {
    App.stopScraping()
  }

  async function exportEmails() {
    // App.exportEmails(store.emails)
    // App.exportEmails(['test@gmail.com', 'test@gmail.com'])
    // dialog
    //   .showSaveDialog({
    //     title: 'Select the File Path to save',
    //     defaultPath: '../assets/sample.txt',
    //     // defaultPath: path.join(__dirname, '../assets/'),
    //     buttonLabel: 'Save',
    //     // Restricting the user to only Text Files.
    //     filters: [
    //       {
    //         name: 'Text Files',
    //         extensions: ['txt', 'docx'],
    //       },
    //     ],
    //     properties: [],
    //   })
    //   .then((file) => {
    //     // Stating whether dialog operation was cancelled or not.
    //     console.log(file.canceled)
    //     if (!file.canceled) {
    //       console.log(file.filePath!.toString())
    //       // Creating and Writing to the sample.txt file
    //       fs.writeFile(
    //         file.filePath!.toString(),
    //         'This is a Sample File',
    //         function (err) {
    //           if (err) throw err
    //           console.log('Saved!')
    //         }
    //       )
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
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
      <div className="flex gap-x-6">
        <Button
          disabled={store.isScraping}
          onClick={getHrefs}
        >{`Get ${searchTerms} links`}</Button>
        <Button
          disabled={store.isFetching || store.hrefs.length === 0}
          onClick={store.isScraping ? stopFindingEmails : findEmails}
        >
          {store.isScraping ? `Stop` : `Find emails`}
        </Button>
        <Button
          // disabled={store.isScraping || store.emails.length === 0}
          onClick={exportEmails}
        >
          {`Export`}
        </Button>
      </div>
      <ul>
        {<li className="font-bold">{store.status}</li>}

        {(showLinks &&
          store.hrefs.map((href, index) => (
            <li key={`link-${index}`}>{href}</li>
          ))) || <></>}

        {!showLinks &&
          store.emails.map((email, index) => (
            <li key={`email-${index}`}>{email}</li>
          ))}
      </ul>
    </Container>
  )
}
