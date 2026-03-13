import React from 'react'
import { Link } from 'react-router-dom'

const TermosPage: React.FC = () => {
  return (
    <section className="bg-brand-sand min-h-screen pt-28 pb-16">
      <div className="mx-auto max-w-3xl px-4">
        <nav className="mb-8 text-sm text-stone-500">
          <Link to="/" className="hover:text-ink">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">Termos de Uso</span>
        </nav>

        <h1 className="font-display text-3xl font-black text-ink mb-2">Termos de Uso</h1>
        <p className="text-xs text-stone-500 mb-10">Última atualização: março de 2026</p>

        <div className="space-y-8 text-stone-700 leading-relaxed text-sm">
          <div>
            <h2 className="font-semibold text-ink text-base mb-2">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e usar o site Mar&amp;Mov, você concorda com os presentes Termos de Uso. Se não concordar com qualquer parte destes termos, não utilize nosso site.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink text-base mb-2">2. Uso do Site</h2>
            <p>
              O site Mar&amp;Mov tem como finalidade apresentar nossos produtos e facilitar o contato com nossa equipe de vendas pelo WhatsApp. O uso indevido, como tentativas de acesso não autorizado, scraping de dados ou qualquer atividade que prejudique o funcionamento do site, é expressamente proibido.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink text-base mb-2">3. Pedidos e Pagamentos</h2>
            <p>
              Os pedidos são finalizados diretamente com nossa equipe pelo WhatsApp. Ao submeter um pedido, você concorda com os valores, condições e prazos informados pela nossa equipe. Reservamo-nos o direito de recusar pedidos em caso de inconsistências.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink text-base mb-2">4. Preços e Disponibilidade</h2>
            <p>
              Os preços exibidos no site são estimativas e podem sofrer alterações. A disponibilidade de estoque é confirmada no ato do pedido pelo WhatsApp. Nos reservamos o direito de corrigir eventuais erros de precificação.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink text-base mb-2">5. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo do site — incluindo textos, imagens, logotipos e design — é de propriedade da Mar&amp;Mov ou licenciado por fornecedores. É proibida a reprodução ou uso sem autorização prévia.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink text-base mb-2">6. Limitação de Responsabilidade</h2>
            <p>
              A Mar&amp;Mov não se responsabiliza por danos indiretos decorrentes do uso do site. Fazemos esforços razoáveis para manter o site funcionando, mas não garantimos disponibilidade ininterrupta.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink text-base mb-2">7. Alterações</h2>
            <p>
              Podemos atualizar estes Termos a qualquer momento. As alterações entram em vigor na data de publicação. O uso contínuo do site após as alterações implica aceitação dos novos termos.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-ink text-base mb-2">8. Contato</h2>
            <p>
              Dúvidas sobre estes Termos? Entre em contato pelo email{' '}
              <a href="mailto:contato@maremov.com.br" className="text-[#477e8a] hover:underline">
                contato@maremov.com.br
              </a>{' '}
              ou pelo WhatsApp{' '}
              <a href="https://wa.me/5581981894816" className="text-[#477e8a] hover:underline" target="_blank" rel="noreferrer">
                (81) 98189-4816
              </a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TermosPage
