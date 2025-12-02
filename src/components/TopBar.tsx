import React from 'react'

const TopBar: React.FC = () => {
  // Personalize rapidamente estes valores de destaque da faixa superior
  const freeShippingValue = 'R$ 299' // Altere aqui o valor mínimo para frete grátis
  const couponCode = 'MAR10' // Troque o cupom aqui
  const whatsappNumber = '+55 11 93494-2311' // Atualize quando o número mudar
  const instagramHandle = '@marandmov.oficial' // Troque pelo @ oficial

  return (
    <div className="bg-brand-aqua/15 text-sm text-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 md:grid md:grid-cols-3 md:items-center">
        <div className="flex items-center gap-2">
          <span className="chip bg-white/80 text-brand-deep">Frete</span>
          <p className="font-semibold leading-tight">
            Frete grátis acima de{' '}
            <span className="font-extrabold text-brand-deep">{freeShippingValue}</span> para todo o Brasil
          </p>
        </div>

        <div className="glass-panel flex flex-wrap items-center justify-center gap-2 rounded-full px-4 py-2 shadow-soft">
          {/* Troque o cupom e a mensagem de destaque aqui */}
          <span className="chip bg-brand-deep text-white shadow-sm">10% OFF</span>
          <p className="text-center text-sm font-semibold">
            Use o cupom <span className="text-brand-deep">{couponCode}</span> e ganhe 10% OFF na primeira compra
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-start gap-4 md:justify-end">
          {/* Atualize os links para os perfis reais quando necessário */}
          <a
            href="https://wa.me/5511934942311"
            className="flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 font-semibold text-brand-deep transition hover:bg-brand-aqua/30"
          >
            <span aria-hidden="true">💬</span>
            <span>{whatsappNumber}</span>
          </a>
          <a
            href="https://instagram.com/marandmov.oficial"
            className="flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 font-semibold text-brand-deep transition hover:bg-brand-aqua/30"
          >
            <span aria-hidden="true">📸</span>
            <span>{instagramHandle}</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default TopBar
