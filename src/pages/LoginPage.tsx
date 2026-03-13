import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../context/ToastContext'

const PROFILE_STORAGE_KEY = 'marmov:user-profile'

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 11) return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  return digits
}

const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = 'Informe seu nome completo.'
    }
    if (!validateEmail(email)) {
      newErrors.email = 'Informe um email válido.'
    }
    const digits = phone.replace(/\D/g, '')
    if (digits.length < 10) {
      newErrors.phone = 'Informe um telefone com DDD.'
    }
    if (password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres.'
    }
    return newErrors
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

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

  const clearError = (field: string) =>
    setErrors((prev) => {
      const next = { ...prev }
      delete next[field]
      return next
    })

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

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-1">
              <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-stone-500">Nome</label>
              <input
                type="text"
                value={name}
                onChange={(event) => { setName(event.target.value); clearError('name') }}
                placeholder="Seu nome completo"
                className={`h-11 w-full border px-3 text-sm text-[#0a1f3d] outline-none transition ${errors.name ? 'border-rose-400 focus:border-rose-500' : 'border-stone-300 focus:border-[#477e8a]'}`}
              />
              {errors.name && <p className="text-xs text-rose-500">{errors.name}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-stone-500">Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => { setEmail(event.target.value); clearError('email') }}
                placeholder="seuemail@exemplo.com"
                className={`h-11 w-full border px-3 text-sm text-[#0a1f3d] outline-none transition ${errors.email ? 'border-rose-400 focus:border-rose-500' : 'border-stone-300 focus:border-[#477e8a]'}`}
              />
              {errors.email && <p className="text-xs text-rose-500">{errors.email}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-stone-500">Celular</label>
              <input
                type="tel"
                value={phone}
                onChange={(event) => { setPhone(formatPhone(event.target.value)); clearError('phone') }}
                placeholder="(81) 99999-9999"
                className={`h-11 w-full border px-3 text-sm text-[#0a1f3d] outline-none transition ${errors.phone ? 'border-rose-400 focus:border-rose-500' : 'border-stone-300 focus:border-[#477e8a]'}`}
              />
              {errors.phone && <p className="text-xs text-rose-500">{errors.phone}</p>}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-stone-500">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(event) => { setPassword(event.target.value); clearError('password') }}
                placeholder="Mínimo 6 caracteres"
                className={`h-11 w-full border px-3 text-sm text-[#0a1f3d] outline-none transition ${errors.password ? 'border-rose-400 focus:border-rose-500' : 'border-stone-300 focus:border-[#477e8a]'}`}
              />
              {errors.password && <p className="text-xs text-rose-500">{errors.password}</p>}
            </div>

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
