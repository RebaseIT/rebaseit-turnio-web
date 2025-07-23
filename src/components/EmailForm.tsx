import React, { useState } from 'react'
import { Mail, ArrowRight, Loader2 } from 'lucide-react'

interface EmailFormProps {
  onEmailSubmit: (email: string) => Promise<void>
  isLoading: boolean
}

export function EmailForm({ onEmailSubmit, isLoading }: EmailFormProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Por favor ingresa tu email')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Por favor ingresa un email válido')
      return
    }

    try {
      await onEmailSubmit(email.trim().toLowerCase())
    } catch (err) {
      setError('Error al procesar tu solicitud. Inténtalo de nuevo.')
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
            disabled={isLoading}
          />
        </div>
        
        {error && (
          <p className="text-red-500 text-sm text-center animate-in fade-in duration-200">
            {error}
          </p>
        )}
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-800 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              Quiero acceso anticipado
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </>
          )}
        </button>
      </form>
    </div>
  )
}