import ReactDom from 'react-dom/client'
import React from 'react'
import './app.css'

import { WindowStoreProvider } from './store'
import { AppRoutes } from './routes'

ReactDom.createRoot(document.querySelector('app') as HTMLElement).render(
  <React.StrictMode>
    <WindowStoreProvider>
      <AppRoutes />
    </WindowStoreProvider>
  </React.StrictMode>
)
