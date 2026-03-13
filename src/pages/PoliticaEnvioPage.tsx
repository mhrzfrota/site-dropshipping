import React from 'react'
import { Link } from 'react-router-dom'

const PoliticaEnvioPage: React.FC = () => {
  return (
    <section className="bg-brand-sand min-h-screen pt-28 pb-16">
      <div className="mx-auto max-w-3xl px-4">
        <nav className="mb-8 text-sm text-stone-500">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">Política de Envio</span>
        </nav>

        <h1 className="font-display text-3xl font-black text-ink mb-2">Política de Envio</h1>
        <p className="text-xs text-stone-500 mb-10">Última atualização: março de 2026</p>

        <div className="space-y-8 text-stone-700 leading-relaxed text-sm">
          <div>
            <h2 className="font-semibold text-ink text-base mb-2">Processamento do pedido</h2>
            <p>
              Após a confirmação do pagamento, seu pedido é processado em até <strong>2 dias úteis</strong>. Durante períodos de alta demanda, o prazo pode ser ligeiramente maior — nossa equipe informará caso isso ocorra.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink text-base mb-2">Modalidades de envio</h2>
            <p>Trabalhamos com as seguintes modalidades:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>PAC</strong> — prazo estimado de 5 a 10 dias úteis</li>
              <li><strong>SEDEX</strong> — prazo estimado de 2 a 5 dias úteis</li>
              <li>Transportadoras parceiras para regiões específicas</li>
            </ul>
            <p className="mt-2">
              O frete e a modalidade disponível para o seu CEP são informados pela nossa equipe no momento de finalização do pedido pelo WhatsApp.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink text-base mb-2">Rastreamento</h2>
            <p>
              Assim que seu pedido for enviado, você receberá o código de rastreamento pelo WhatsApp. Use o rastreador dos <a href="https://www.correios.com.br" className="text-[#477e8a] hover:underline" target="_blank" rel="noreferrer">Correios</a> ou da transportadora parceira.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink text-base mb-2">Regiões atendidas</h2>
            <p>
              Enviamos para todo o Brasil. Para localidades remotas ou de difícil acesso, o prazo pode ser maior. Entre em contato com nossa equipe para confirmar a viabilidade de entrega no seu endereço.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink text-base mb-2">Pedido não entregue ou extraviado</h2>
            <p>
              Se seu pedido não chegar dentro do prazo estimado ou se houver qualquer problema com a entrega, entre em contato imediatamente pelo WhatsApp ou email. Verificaremos a situação e tomaremos as providências necessárias.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink text-base mb-2">Responsabilidade</h2>
            <p>
              Após a entrega à transportadora, o prazo de entrega é de responsabilidade da mesma. A Mar&amp;Mov fará todo o possível para auxiliar em casos de atraso ou extravio.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-xl border border-[#477e8a]/25 bg-white p-6 shadow-sm text-center space-y-3">
          <p className="font-semibold text-ink">Dúvidas sobre seu envio?</p>
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

export default PoliticaEnvioPage
