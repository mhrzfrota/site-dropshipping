import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const faqs = [
  {
    question: 'Como faço um pedido?',
    answer:
      'Adicione os produtos desejados ao carrinho, selecione tamanho e cor quando disponíveis, e clique em "Finalizar pedido pelo WhatsApp". Você será direcionado ao nosso WhatsApp com a lista de itens pronta.',
  },
  {
    question: 'Quais formas de pagamento são aceitas?',
    answer:
      'Aceitamos Pix, cartão de crédito e dinheiro. O pagamento é combinado diretamente com nossa equipe pelo WhatsApp após o envio do pedido.',
  },
  {
    question: 'Qual o prazo de entrega?',
    answer:
      'O prazo varia conforme a região e a modalidade de envio escolhida. Em média, as entregas ocorrem entre 3 e 10 dias úteis após a confirmação do pagamento. Nosso time informará o prazo exato no momento do pedido.',
  },
  {
    question: 'Posso trocar ou devolver um produto?',
    answer:
      'Sim! Consulte nossa Política de Troca e Devolução para conhecer as condições e prazos. Em caso de dúvidas, entre em contato pelo WhatsApp ou email.',
  },
  {
    question: 'Como rastrear meu pedido?',
    answer:
      'Após o envio, você receberá o código de rastreamento pelo WhatsApp. Use o site dos Correios ou da transportadora para acompanhar a entrega.',
  },
  {
    question: 'O site é seguro para compras?',
    answer:
      'Sim. Nosso site utiliza certificado SSL, garantindo que suas informações sejam transmitidas com segurança. Os dados de pagamento são tratados exclusivamente pelo WhatsApp com nossa equipe.',
  },
]

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-stone-200">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold text-ink"
        aria-expanded={open}
      >
        {question}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-4 w-4 shrink-0 text-[#477e8a] transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg>
      </button>
      {open && <p className="pb-4 text-sm text-stone-600 leading-relaxed">{answer}</p>}
    </div>
  )
}

const AjudaPage: React.FC = () => {
  return (
    <section className="bg-brand-sand min-h-screen pt-28 pb-16">
      <div className="mx-auto max-w-3xl px-4">
        <nav className="mb-8 text-sm text-stone-500">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">Ajuda</span>
        </nav>

        <h1 className="font-display text-3xl font-black text-ink mb-2">Central de Ajuda</h1>
        <p className="text-stone-600 mb-10">Encontre respostas para as dúvidas mais frequentes.</p>

        <div className="divide-y divide-stone-200 rounded-xl border border-stone-200 bg-white px-6 shadow-sm mb-10">
          {faqs.map((faq) => (
            <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <div className="rounded-xl border border-[#477e8a]/25 bg-white p-6 shadow-sm text-center space-y-3">
          <p className="font-semibold text-ink">Não encontrou o que procurava?</p>
          <p className="text-sm text-stone-600">Fale diretamente com nossa equipe pelo WhatsApp.</p>
          <a
            href="https://wa.me/5581981894816"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded bg-[#25D366] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#1ebe5d]"
          >
            Chamar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

export default AjudaPage
