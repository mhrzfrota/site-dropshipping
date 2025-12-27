import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage: React.FC = () => {
  return (
    <section className="bg-brand-sand py-16">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">404</p>
        <h1 className="mt-3 font-display text-3xl font-black text-stone-800 sm:text-4xl">
          Página não encontrada
        </h1>
        <p className="mt-2 text-sm text-stone-600">
          O conteúdo que você procura não está disponível. Explore nossa vitrine completa.
        </p>
        <Link
          to="/"
          className="btn-primary mt-6 inline-flex items-center gap-2"
        >
          Voltar para a home
        </Link>
      </div>
    </section>
  )
}

export default NotFoundPage
