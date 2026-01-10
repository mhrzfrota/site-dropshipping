import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0aa3a8] text-stone-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <p className="font-display text-2xl font-bold">Mar&Mov</p>
          <p className="text-sm text-stone-300">
            Moda praia e fitness com curadoria real. Compre online ou retire na loja fÇðsica.
          </p>
          <p className="text-sm text-stone-300">Atendimento humano e entregas para todo o Brasil.</p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="text-xs font-semibold tracking-[0.12em] text-[#0a1f3d]">Atendimento</p>
          <p className="text-stone-200">WhatsApp: +55 11 93494-2311</p>
          <p className="text-stone-300">contato@marmov.com</p>
          <p className="text-stone-300">Seg a Sex: 08:00 Çÿs 18:00</p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="text-xs font-semibold tracking-[0.12em] text-[#0a1f3d]">Loja fÇðsica</p>
          <p className="text-stone-200">BR 408, n¶§ 1250, Centro</p>
          <p className="text-stone-300">Recife - PE, 50000-000</p>
          <p className="text-stone-300">Seg a Qui: 07:30 Çÿs 18:00</p>
          <p className="text-stone-300">Sex: atÇ¸ 17:00</p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="text-xs font-semibold tracking-[0.12em] text-[#0a1f3d]">PolÇðticas</p>
          <Link to="/produtos" className="block text-stone-200 transition hover:text-white">
            Troca e devoluÇõÇœo
          </Link>
          <Link to="/produtos" className="block text-stone-200 transition hover:text-white">
            Privacidade
          </Link>
        </div>
      </div>
      <div className="border-t border-stone-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-[#0a1f3d] sm:flex-row">
          <span>© 2026 Mar&Mov. Todos os direitos reservados.</span>
          <span>Feito com foco em conforto e estilo.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
