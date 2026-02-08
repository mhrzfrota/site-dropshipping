import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../context/ToastContext'

const PROFILE_STORAGE_KEY = 'marmov:user-profile'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const profileData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    }

    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profileData))
    window.dispatchEvent(new Event('marmov-profile-updated'))
    showToast('Login realizado com sucesso.')
    navigate('/perfil', { state: { profileData } })
  }

  return (
    <section className="bg-brand-sand py-20 pt-28">
      <div className="mx-auto max-w-xl px-4">
        <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 space-y-2">
            <h1 className="font-raleway text-2xl font-semibold text-[#0a1f3d] sm:text-[1.8rem]">
              Entrar na conta
            </h1>
            <p className="text-sm text-stone-600">
              Preencha seus dados para acessar sua conta.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block space-y-1">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-stone-500">Nome</span>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Seu nome"
                className="h-11 w-full border border-stone-300 px-3 text-sm text-[#0a1f3d] outline-none transition focus:border-[#477e8a]"
                required
              />
            </label>

            <label className="block space-y-1">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-stone-500">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="seuemail@exemplo.com"
                className="h-11 w-full border border-stone-300 px-3 text-sm text-[#0a1f3d] outline-none transition focus:border-[#477e8a]"
                required
              />
            </label>

            <label className="block space-y-1">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-stone-500">Celular</span>
              <input
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="(81) 99999-9999"
                className="h-11 w-full border border-stone-300 px-3 text-sm text-[#0a1f3d] outline-none transition focus:border-[#477e8a]"
                required
              />
            </label>

            <label className="block space-y-1">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-stone-500">Senha</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Digite sua senha"
                className="h-11 w-full border border-stone-300 px-3 text-sm text-[#0a1f3d] outline-none transition focus:border-[#477e8a]"
                required
              />
            </label>

            <button
              type="submit"
              className="mt-2 flex h-12 w-full items-center justify-center bg-[#477e8a] text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#3d6f7a]"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default LoginPage
