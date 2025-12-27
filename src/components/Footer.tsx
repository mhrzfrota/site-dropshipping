import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <p className="font-display text-2xl font-bold">Mar&Mov</p>
          <p className="text-sm text-stone-300">
            Beach Wear e Fitness para todos os momentos. Compre online e retire na loja ou receba em todo o Brasil.
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">Institucional</p>
          <Link to="/produtos" className="block text-stone-200 transition hover:text-white">
            Coleções
          </Link>
          <Link to="/categoria/biquinis" className="block text-stone-200 transition hover:text-white">
            Moda Praia
          </Link>
          <Link to="/categoria/roupas" className="block text-stone-200 transition hover:text-white">
            Lifestyle
          </Link>
        </div>

        <div className="space-y-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">Atendimento</p>
          <p className="text-stone-200">WhatsApp: (11) 98765-4321</p>
          <p className="text-stone-200">Email: contato@marmov.com</p>
          <p className="text-stone-200">Seg a Sex, 9h às 18h</p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">Loja física</p>
          <p className="text-stone-200">Rua das Ondas, 123</p>
          <p className="text-stone-200">Ipanema, Rio de Janeiro</p>
          <p className="text-stone-200">CEP 22400-000</p>
        </div>
      </div>
      <div className="border-t border-stone-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-stone-400 sm:flex-row">
          <span>© 2025 Mar&Mov. Todos os direitos reservados.</span>
          <span>Feito com foco em conforto e estilo.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
