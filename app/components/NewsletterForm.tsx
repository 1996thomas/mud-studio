'use client'

import { useActionState } from 'react'
import { subscribeToNewsletter } from '@/app/actions/newsletter'

const initialState = { success: undefined as boolean | undefined, message: '' }

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribeToNewsletter, initialState)

  return (
    <form
      action={formAction}
      className="w-full max-w-sm flex flex-col gap-5 p-8 shadow-2xl rounded-xl"
      style={{
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
      }}
    >
      <div className="flex flex-col gap-1 text-center">
        <h2 className="text-white text-2xl font-black uppercase">
          Mud Studio
        </h2>
        <p className="text-white/50 text-sm tracking-wide">
          Restez informés de nos actualités
        </p>
      </div>

      <input
        type="email"
        name="email"
        placeholder="votre@email.com"
        required
        disabled={state?.success}
        className="w-full px-4 py-3 text-white rounded-md placeholder:text-white/30 text-sm focus:outline-none transition"
        style={{
          background: 'rgba(255, 255, 255, 0.07)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      />

      <button
        type="submit"
        disabled={pending || state?.success}
        className="w-full py-3  text-white/90 text-sm rounded-md font-medium tracking-wider uppercase transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        {pending ? 'Inscription…' : state?.success ? 'Inscrit ✓' : "S'inscrire"}
      </button>

      {state?.message && (
        <p
          aria-live="polite"
          className={`text-xs text-center tracking-wide ${
            state.success ? 'text-white/70' : 'text-red-300/80'
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  )
}
