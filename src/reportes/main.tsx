import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter/wght.css'
import '@fontsource-variable/noto-serif/wght.css'
import '../index.css'
import { Reportes } from './Reportes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Reportes />
  </StrictMode>,
)
