import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { StoreProvider } from './hooks/useStore'
import './index.css'
// HashRouter keeps deep links (/#/admin, /#/orders/RF1024) working on GitHub Pages without a server.
createRoot(document.getElementById('root')).render(
  <HashRouter><StoreProvider><App /></StoreProvider></HashRouter>
)
