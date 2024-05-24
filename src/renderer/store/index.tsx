import { useContext, createContext, useState } from 'react'

export interface WindowStore {
  about: {
    isOpen: boolean
    setAboutWindowState: (value: boolean) => void
  }
  scraper: {
    isFetching: boolean
    setFetchStatus: (value: boolean) => void
    hrefs: string[]
    status: string
    setScraperStatus: (status: string) => void
    setHrefs: (hrefs: string[]) => void
    setScraperWindowState: (value: boolean) => void
    emails: string[]
    setEmails: (emails: string[]) => void
    addEmail: (email: string) => void
  }
}

const WindowStoreContext = createContext({} as WindowStore)

export function useWindowStore() {
  return useContext(WindowStoreContext)
}

export function WindowStoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [state, setState] = useState<WindowStore>({
    about: { isOpen: false, setAboutWindowState },
    scraper: {
      isFetching: false,
      setFetchStatus,
      status: '',
      hrefs: [],
      setHrefs,
      setScraperStatus,
      setScraperWindowState,
      emails: [],
      setEmails,
      addEmail,
    },
  })

  function setAboutWindowState(value: boolean) {
    setState((state) => ({
      ...state,
      about: {
        ...state.about,
        isOpen: value,
      },
    }))
  }

  function setScraperWindowState(value: boolean) {
    setState((state) => ({
      ...state,
      scraper: {
        ...state.scraper,
        isFetching: value,
      },
    }))
  }

  function setFetchStatus(value: boolean) {
    setState((state) => ({
      ...state,
      scraper: {
        ...state.scraper,
        isFetching: value,
      },
    }))
  }

  function setHrefs(hrefs: string[]) {
    setState((state) => ({
      ...state,
      scraper: {
        ...state.scraper,
        hrefs,
      },
    }))
  }

  function setScraperStatus(status: string) {
    setState((state) => ({
      ...state,
      scraper: {
        ...state.scraper,
        status,
      },
    }))
  }

  function setEmails(emails: string[]) {
    setState((state) => ({
      ...state,
      scraper: {
        ...state.scraper,
        emails,
      },
    }))
  }

  function addEmail(email: string) {
    setState((state) => ({
      ...state,
      scraper: {
        ...state.scraper,
        emails: [...state.scraper.emails, email],
      },
    }))
  }

  return (
    <WindowStoreContext.Provider value={state}>
      {children}
    </WindowStoreContext.Provider>
  )
}
