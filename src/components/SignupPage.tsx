import React, { useState } from 'react'
import { Calendar, ArrowLeft } from 'lucide-react'
import { supabase } from '../lib/supabase'

export function SignupPage() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    surname: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const { error } = await supabase
        .from('leads')
        .insert([{ 
          email: formData.email,
          name: formData.name,
          surname: formData.surname,
          wants_discount: false
        }])

      if (error) {
        if (error.code === '23505') {
          console.log('Email already registered')
        } else {
          throw error
        }
      } else {
        // Send confirmation email via Supabase Edge Function
        await sendEmailConfirmation(formData.email)
        setIsSubmitted(true)
      }
    } catch (error) {
      console.error('Error saving data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const sendEmailConfirmation = async (email: string) => {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const functionUrl = `${supabaseUrl}/functions/v1/send-confirmation-email`
      
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ email }),
      })
      
      if (response.ok) {
        console.log('Confirmation email sent successfully')
      } else {
        console.error('Failed to send confirmation email:', await response.text())
      }
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Turnio</span>
          </div>
          
          <a 
            href="/" 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 pb-16 pt-16">
        <div className="max-w-2xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center space-y-8 mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              Acceso Anticipado
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Únete a Turnio
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                antes que nadie
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-xl mx-auto leading-relaxed">
              Sé de los primeros en descubrir cómo Turnio puede transformar la manera en que gestionas tu negocio.
            </p>
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-2">
                  Apellido *
                </label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  value={formData.surname}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Tu apellido"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Enviando...' : 'Registrarme'}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Column 1: Turnio */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Turnio</span>
              </div>
              <p className="text-gray-400 text-sm">
                Gestiona tus turnos sin complicaciones
              </p>
            </div>

            {/* Column 2: Navegación */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold">Navegación</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/#como-funciona" className="text-gray-400 hover:text-white transition-colors">
                    Cómo funciona
                  </a>
                </li>
                <li>
                  <a href="/#que-ofrecemos" className="text-gray-400 hover:text-white transition-colors">
                    Qué ofrecemos
                  </a>
                </li>
                <li>
                  <a href="/#planes" className="text-gray-400 hover:text-white transition-colors">
                    Planes
                  </a>
                </li>
                <li>
                  <a href="/#footer" className="text-gray-400 hover:text-white transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Contactanos */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold">Contactanos</h3>
              <p className="text-gray-400 text-sm">
                sales@rebaseit.tech
              </p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 pt-8">
            <p className="text-center text-gray-400 text-sm">
              © 2025 Rebase IT. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
} 