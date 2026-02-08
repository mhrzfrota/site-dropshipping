import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useToast } from '../context/ToastContext'

const PROFILE_STORAGE_KEY = 'marmov:user-profile'

type LoginProfileData = {
  name: string
  email: string
  phone: string
}

type FormValues = {
  firstName: string
  lastName: string
  email: string
  phone: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

type LocationState = {
  profileData?: Partial<LoginProfileData>
}

const splitName = (name: string) => {
  const normalizedName = name.trim()
  if (!normalizedName) {
    return { firstName: '', lastName: '' }
  }

  const [firstName, ...rest] = normalizedName.split(/\s+/)
  return {
    firstName,
    lastName: rest.join(' '),
  }
}

const getInitialValues = (locationState: LocationState | null): FormValues => {
  let initialName = ''
  let initialEmail = ''
  let initialPhone = ''

  const fromRoute = locationState?.profileData
  if (fromRoute) {
    initialName = fromRoute.name?.trim() ?? ''
    initialEmail = fromRoute.email?.trim() ?? ''
    initialPhone = fromRoute.phone?.trim() ?? ''
  }

  if (!initialName || !initialEmail || !initialPhone) {
    const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY)
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Partial<LoginProfileData>
        initialName = initialName || parsed.name?.trim() || ''
        initialEmail = initialEmail || parsed.email?.trim() || ''
        initialPhone = initialPhone || parsed.phone?.trim() || ''
      } catch {
        // Ignore invalid local storage payload
      }
    }
  }

  const { firstName, lastName } = splitName(initialName)

  return {
    firstName,
    lastName,
    email: initialEmail,
    phone: initialPhone,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  }
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { showToast } = useToast()
  const [isDataOpen, setIsDataOpen] = useState(true)
  const [isOrdersOpen, setIsOrdersOpen] = useState(true)
  const [isPasswordOpen, setIsPasswordOpen] = useState(false)
  const [formValues, setFormValues] = useState<FormValues>(() => getInitialValues(location.state as LocationState | null))

  const fullName = `${formValues.firstName} ${formValues.lastName}`.trim()

  const handleFieldChange =
    (field: keyof FormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      setFormValues((prev) => ({ ...prev, [field]: value }))
    }

  const handleSaveData = () => {
    const payload: LoginProfileData = {
      name: fullName,
      email: formValues.email.trim(),
      phone: formValues.phone.trim(),
    }
    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(payload))
    window.dispatchEvent(new Event('marmov-profile-updated'))
    showToast('Dados atualizados (simulacao).')
  }

  const handleForgetData = () => {
    showToast('Solicitacao de esquecimento registrada (simulacao).')
  }

  const handleLogout = () => {
    window.localStorage.removeItem(PROFILE_STORAGE_KEY)
    window.dispatchEvent(new Event('marmov-profile-updated'))
    showToast('Sessao encerrada.')
    navigate('/')
  }

  return (
    <section className="bg-brand-sand pb-14 pt-24 sm:pb-16">
      <div className="mx-auto w-full max-w-[1200px] px-3 sm:px-5 lg:px-6">
        <div className="mb-4 flex justify-end">
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex min-h-[36px] items-center justify-center bg-[#0a1f3d] px-6 text-xs font-semibold text-white transition hover:bg-[#091734]"
          >
            Sair
          </button>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <article className="border border-[#477e8a]/20 bg-white shadow-[0_10px_24px_rgba(10,31,61,0.08)]">
            <button
              type="button"
              onClick={() => setIsDataOpen((prev) => !prev)}
              className="flex w-full items-center justify-between gap-3 p-4 text-left sm:p-4"
              aria-expanded={isDataOpen}
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#22b7a7] text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M12 14c-4.42 0-8 2.58-8 5.75V21h16v-1.25C20 16.58 16.42 14 12 14Z" />
                  </svg>
                </span>
                <div className="space-y-0.5">
                  <h1 className="font-raleway text-lg font-semibold text-[#0a1f3d]">Meus dados</h1>
                  <p className="text-xs text-stone-600">Mantenha seus dados atualizados</p>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`h-4 w-4 text-[#22b7a7] transition-transform ${isDataOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M5.22 11.78a.75.75 0 0 1 1.06 0L10 15.5l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 12.84a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </button>

            {isDataOpen && (
              <div className="space-y-3 border-t border-stone-200 p-4">
                <label className="block space-y-2">
                  <span className="text-xs text-stone-500">Nome *</span>
                  <input
                    type="text"
                    value={formValues.firstName}
                    onChange={handleFieldChange('firstName')}
                    className="h-9 w-full border-b border-stone-800 bg-transparent px-1 text-base text-[#0a1f3d] outline-none"
                    required
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-xs text-stone-500">Sobrenome *</span>
                  <input
                    type="text"
                    value={formValues.lastName}
                    onChange={handleFieldChange('lastName')}
                    className="h-9 w-full border-b border-stone-300 bg-transparent px-1 text-base text-[#0a1f3d] outline-none focus:border-[#477e8a]"
                    required
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-xs text-stone-500">Email *</span>
                  <input
                    type="email"
                    value={formValues.email}
                    onChange={handleFieldChange('email')}
                    className="h-9 w-full border-b border-stone-300 bg-transparent px-1 text-base text-[#0a1f3d] outline-none focus:border-[#477e8a]"
                    required
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-xs text-stone-500">Telefone *</span>
                  <input
                    type="tel"
                    value={formValues.phone}
                    onChange={handleFieldChange('phone')}
                    className="h-9 w-full border-b border-stone-300 bg-transparent px-1 text-base text-[#0a1f3d] outline-none focus:border-[#477e8a]"
                    required
                  />
                </label>

                <div className="overflow-hidden rounded-sm border border-stone-200">
                  <button
                    type="button"
                    onClick={() => setIsPasswordOpen((prev) => !prev)}
                    className="flex h-11 w-full items-center justify-between px-4 text-left font-raleway text-base font-semibold text-[#0a1f3d]"
                    aria-expanded={isPasswordOpen}
                  >
                    Alterar minha senha
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className={`h-4 w-4 text-[#22b7a7] transition-transform ${isPasswordOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    >
                      <path fillRule="evenodd" d="M5.22 11.78a.75.75 0 0 1 1.06 0L10 15.5l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 12.84a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {isPasswordOpen && (
                    <div className="space-y-3 border-t border-stone-200 p-4">
                      <label className="block space-y-2">
                        <span className="text-xs text-stone-500">Senha atual</span>
                        <input
                          type="password"
                          value={formValues.currentPassword}
                          onChange={handleFieldChange('currentPassword')}
                          className="h-9 w-full border border-stone-300 px-3 text-xs text-[#0a1f3d] outline-none transition focus:border-[#477e8a]"
                        />
                      </label>
                      <label className="block space-y-2">
                        <span className="text-xs text-stone-500">Nova senha</span>
                        <input
                          type="password"
                          value={formValues.newPassword}
                          onChange={handleFieldChange('newPassword')}
                          className="h-9 w-full border border-stone-300 px-3 text-xs text-[#0a1f3d] outline-none transition focus:border-[#477e8a]"
                        />
                      </label>
                      <label className="block space-y-2">
                        <span className="text-xs text-stone-500">Confirmar nova senha</span>
                        <input
                          type="password"
                          value={formValues.confirmPassword}
                          onChange={handleFieldChange('confirmPassword')}
                          className="h-9 w-full border border-stone-300 px-3 text-xs text-[#0a1f3d] outline-none transition focus:border-[#477e8a]"
                        />
                      </label>
                    </div>
                  )}
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={handleSaveData}
                    className="flex h-10 w-full items-center justify-center bg-[#0a1f3d] text-sm font-semibold text-white transition hover:bg-[#091734]"
                  >
                    Atualizar dados
                  </button>
                  <button
                    type="button"
                    onClick={handleForgetData}
                    className="flex h-10 w-full items-center justify-center bg-[#0a1f3d] text-sm font-semibold text-white transition hover:bg-[#091734]"
                  >
                    Solicitar esquecimento de dados
                  </button>
                </div>
              </div>
            )}
          </article>

          <article id="pedidos" className="border border-[#477e8a]/20 bg-white shadow-[0_10px_24px_rgba(10,31,61,0.08)]">
            <button
              type="button"
              onClick={() => setIsOrdersOpen((prev) => !prev)}
              className="flex w-full items-center justify-between gap-3 p-4 text-left sm:p-4"
              aria-expanded={isOrdersOpen}
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#22b7a7] text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
                    <path d="M3 5.75A1.75 1.75 0 0 1 4.75 4h8.67A1.75 1.75 0 0 1 15 5.75v.5h3.67A2.33 2.33 0 0 1 21 8.58v5.84a2.33 2.33 0 0 1-2.33 2.33h-.92a2.75 2.75 0 0 1-5.33 0h-2.84a2.75 2.75 0 0 1-5.33 0h-.92A2.33 2.33 0 0 1 1 14.42V8.58a2.33 2.33 0 0 1 2.33-2.33H3v-.5Zm10.5.5v-.5a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25v.5h9Zm-6.5 12a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5Zm8.75 0a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5Z" />
                  </svg>
                </span>
                <div className="space-y-0.5">
                  <h2 className="font-raleway text-lg font-semibold text-[#0a1f3d]">Meus pedidos</h2>
                  <p className="text-xs text-stone-600">Acompanhe seu historico de pedidos</p>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`h-4 w-4 text-[#22b7a7] transition-transform ${isOrdersOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M5.22 11.78a.75.75 0 0 1 1.06 0L10 15.5l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 12.84a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </button>

            {isOrdersOpen && (
              <div className="border-t border-stone-200 px-4 py-12 text-center text-base text-[#0a1f3d]">
                Voce ainda nao realizou nenhum pedido.
              </div>
            )}
          </article>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage
