import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SiteLayout from './layouts/SiteLayout'
import BrandPage from './pages/BrandPage'
import CategoryPage from './pages/CategoryPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ProductsPage from './pages/ProductsPage'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="produtos" element={<ProductsPage />} />
        <Route path="categoria/:slug" element={<CategoryPage />} />
        <Route path="marca/:slug" element={<BrandPage />} />
        <Route path="produto/:slug" element={<ProductDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
