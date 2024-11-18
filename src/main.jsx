import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import QRCodePage from './pages/qrCodePage.jsx'
import EntrarPage from './pages/entrarPage.jsx'
import FilaPage from './pages/filaPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/:empresa/qrcode",
    element: <QRCodePage />,

  },
  {
    path: "/:empresa/entrar",
    element: <EntrarPage />
  },
  {
    path: "/:empresa/fila",
    element: <FilaPage />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
