import React from 'react'
import { Link } from 'react-router-dom'

const TrocasDevolucaoPage: React.FC = () => {
  return (
    <section className="bg-brand-sand min-h-screen pt-28 pb-16">
      <div className="mx-auto max-w-3xl px-4">
        <nav className="mb-8 text-sm text-stone-500">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">Política de Troca e Devolução</span>
        </nav>

        <h1 className="font-display text-3xl font-black text-ink mb-2">Política de Troca e Devolução</h1>
        <p className="text-xs text-stone-500 mb-10">Última atualização: março de 2026</p>

        <div className="space-y-8 text-stone-700 leading-relaxed text-sm">
          <div>
            <h2 className="font-semibold text-ink text-base mb-2">Prazo para solicitação</h2>
            <p>
              De acordo com o Código de Defesa do Consumidor (Art. 49), você tem até <strong>7 dias corridos</strong> após o recebimento do produto para solicitar troca ou devolução por arrependimento, sem necessidade de justificativa.
            </p>
            <p className="mt-2">
              Em caso de defeito, o prazo é de <strong>30 dias</strong> para produtos não duráveis e <strong>90 dias</strong> para produtos duráveis a partir do recebimento.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink text-base mb-2">Como solicitar</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Entre em contato pelo WhatsApp <a href="https://wa.me/5581981894816" className="text-[#477e8a] hover:underline" target="_blank" rel="noreferrer">(81) 98189-4816</a> ou pelo email <a href="mailto:contato@maremov.com.br" className="text-[#477e8a] hover:underline">contato@maremov.com.br</a>.</li>
              <li>Informe o número do pedido e o motivo da troca/devolução.</li>
              <li>Aguarde as instruções de nossa equipe para o envio do produto.</li>
            </ol>
          </div>

          <div>
            <h2 className="font-semibold text-ink text-base mb-2">Condições do produto</h2>
            <p>Para que a troca ou devolução seja aceita, o produto deve:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Estar em perfeito estado, sem sinais de uso</li>
              <li>Estar com etiquetas originais</li>
              <li>Estar na embalagem original</li>
              <li>Não ter sido lavado</li>
            </ul>
            <p className="mt-2 text-stone-500 text-xs">
              Peças íntimas (biquínis e maiôs) só são aceitas para troca por defeito de fabricação, por questões de higiene.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink text-base mb-2">Frete de devolução</h2>
            <p>
              Em caso de arrependimento, o frete de devolução é de responsabilidade do cliente. Em caso de defeito ou erro no envio, a Mar&amp;Mov arca com os custos do frete.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink text-base mb-2">Reembolso</h2>
            <p>
              Após recebermos e conferirmos o produto devolvido, realizaremos o reembolso via Pix em até <strong>5 dias úteis</strong>, ou a troca do produto conforme disponibilidade de estoque.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-xl border border-[#477e8a]/25 bg-white p-6 shadow-sm text-center space-y-3">
          <p className="font-semibold text-ink">Precisa de ajuda com uma troca?</p>
          <a
            href="https://wa.me/5581981894816"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded bg-[#25D366] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#1ebe5d]"
          >
            Falar com nossa equipe
          </a>
        </div>
      </div>
    </section>
  )
}

export default TrocasDevolucaoPage
