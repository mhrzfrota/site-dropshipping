import React from 'react'
import { Link } from 'react-router-dom'

const InstitucionalPage: React.FC = () => {
  return (
    <section className="bg-brand-sand min-h-screen pt-28 pb-16">
      <div className="mx-auto max-w-3xl px-4">
        <nav className="mb-8 text-sm text-stone-500">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">Institucional</span>
        </nav>

        <h1 className="font-display text-3xl font-black text-ink mb-8">Sobre a Mar&amp;Mov</h1>

        <div className="space-y-8 text-stone-700 leading-relaxed">
          <div>
            <h2 className="font-semibold text-ink text-lg mb-3">Quem somos</h2>
            <p>
              A Mar&amp;Mov nasceu do amor pelo mar e pela liberdade de movimento. Somos uma loja de moda praia e fitness sediada em Paudalho, Pernambuco, com o objetivo de levar estilo, qualidade e conforto para quem vive o verão o ano todo.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink text-lg mb-3">Nossa missão</h2>
            <p>
              Oferecer peças selecionadas das melhores marcas do segmento — como Lupo, Cocci, Marina, Atlântica e Onda — com atendimento próximo e humanizado, direto pelo WhatsApp. Acreditamos que moda praia vai muito além da praia: é um estilo de vida.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink text-lg mb-3">Nosso modelo</h2>
            <p>
              Trabalhamos com curadoria de produtos em parceria com fornecedores confiáveis. Todos os pedidos são processados de forma personalizada, com atendimento direto à nossa equipe. Isso nos permite garantir qualidade, exclusividade e um serviço diferenciado.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink text-lg mb-3">Contato</h2>
            <ul className="space-y-1 text-sm">
              <li>WhatsApp: <a href="https://wa.me/5581981894816" className="text-[#477e8a] hover:underline" target="_blank" rel="noreferrer">(81) 98189-4816</a></li>
              <li>Email: <a href="mailto:contato@maremov.com.br" className="text-[#477e8a] hover:underline">contato@maremov.com.br</a></li>
              <li>Endereço: Rua Costa e Silva, 116 C - Loteamento Primavera, Paudalho - PE, 55825-000</li>
              <li>Horário: Segunda a Quinta, 07h30–18h | Sexta, 07h30–17h</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InstitucionalPage
