import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <p className="font-display text-2xl font-bold">Mar&Mov</p>
          <p className="text-sm text-stone-300">
            Beach Wear e Fitness para todos os momentos. Compre online ou retire na loja.
          </p>
          <p className="text-sm text-stone-300">Atendimento humano e curadoria real.</p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="text-xs font-semibold tracking-[0.12em] text-stone-400">Atendimento</p>
          <p className="text-stone-200">WhatsApp: +55 11 93494-2311</p>
          <p className="text-stone-300">Compre pelo WhatsApp</p>
          <p className="text-stone-300">contato@marmov.com</p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="text-xs font-semibold tracking-[0.12em] text-stone-400">Loja física</p>
          <p className="text-stone-200">BR 408, ao lado da Nattos</p>
          <p className="text-stone-300">Seg a Qui: 07:30 às 18:00</p>
          <p className="text-stone-300">Sex: até 17:00</p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="text-xs font-semibold tracking-[0.12em] text-stone-400">Institucional</p>
          <Link to="/produtos" className="block text-stone-200 transition hover:text-white">
            Coleções
          </Link>
          <Link to="/produtos" className="block text-stone-200 transition hover:text-white">
            Troca e devolução
          </Link>
          <Link to="/produtos" className="block text-stone-200 transition hover:text-white">
            Privacidade
          </Link>
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
