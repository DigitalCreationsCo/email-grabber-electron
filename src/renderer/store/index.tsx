import { useContext, createContext, useState } from 'react'

export interface WindowStore {
  about: {
    isOpen: boolean
    setAboutWindowState: (value: boolean) => void
  }
  scraper: {
    status: string
    setStatus: (status: string) => void

    isFetching: boolean
    setIsFetching: (value: boolean) => void

    hrefs: string[]
    setHrefs: (hrefs: string[]) => void

    isScraping: boolean
    setIsScraping: (value: boolean) => void

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
      status: '',
      setStatus,

      isFetching: false,
      setIsFetching,

      isScraping: false,
      setIsScraping,

      hrefs: [],
      setHrefs,
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

  function setIsScraping(value: boolean) {
    setState((state) => ({
      ...state,
      scraper: {
        ...state.scraper,
        isScraping: value,
      },
    }))
  }

  function setIsFetching(value: boolean) {
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

  function setStatus(status: string) {
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
