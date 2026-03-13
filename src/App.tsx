import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SiteLayout from './layouts/SiteLayout'
import AjudaPage from './pages/AjudaPage'
import SearchPage from './pages/SearchPage'
import BrandPage from './pages/BrandPage'
import CategoryPage from './pages/CategoryPage'
import HomePage from './pages/HomePage'
import InstitucionalPage from './pages/InstitucionalPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import PoliticaEnvioPage from './pages/PoliticaEnvioPage'
import ProfilePage from './pages/ProfilePage'
import ProductDetailPage from './pages/ProductDetailPage'
import ProductsPage from './pages/ProductsPage'
import SalePage from './pages/SalePage'
import TermosPage from './pages/TermosPage'
import TrocasDevolucaoPage from './pages/TrocasDevolucaoPage'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="produtos" element={<ProductsPage />} />
        <Route path="sale" element={<SalePage />} />
        <Route path="categoria/:slug" element={<CategoryPage />} />
        <Route path="marca/:slug" element={<BrandPage />} />
        <Route path="produto/:slug" element={<ProductDetailPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="perfil" element={<ProfilePage />} />
        <Route path="institucional" element={<InstitucionalPage />} />
        <Route path="ajuda" element={<AjudaPage />} />
        <Route path="termos" element={<TermosPage />} />
        <Route path="trocas-devolucao" element={<TrocasDevolucaoPage />} />
        <Route path="politica-envio" element={<PoliticaEnvioPage />} />
        <Route path="busca" element={<SearchPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
