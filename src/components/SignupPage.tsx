import React, { useState } from 'react'
import { Calendar, ArrowLeft } from 'lucide-react'

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
      // Send email via Web3Forms
      await sendWeb3FormsEmail()
      
      // Send email via Resend
      await sendResendEmail()
      
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error sending emails:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const sendWeb3FormsEmail = async () => {
    try {
      const web3formsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
      if (!web3formsKey) {
        console.warn('Web3Forms access key not found')
        return
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: web3formsKey,
          from_name: `${formData.name} ${formData.surname}`,
          from_email: formData.email,
          subject: 'Nuevo registro en Turnio - Acceso Anticipado',
          message: `
            Nuevo usuario registrado para acceso anticipado:
            
            Nombre: ${formData.name} ${formData.surname}
            Email: ${formData.email}
            
            Fecha de registro: ${new Date().toLocaleString('es-ES')}
          `,
        }),
      })

      if (response.ok) {
        console.log('Web3Forms email sent successfully')
      } else {
        console.error('Failed to send Web3Forms email:', await response.text())
      }
    } catch (error) {
      console.error('Error sending Web3Forms email:', error)
    }
  }

  const sendResendEmail = async () => {
    try {
      const resendApiKey = import.meta.env.VITE_RESEND_API_KEY
      if (!resendApiKey) {
        console.warn('Resend API key not found')
        return
      }

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Turnio <noreply@rebaseit.tech>',
          to: [formData.email],
          subject: '¡Bienvenido a Turnio! - Acceso Anticipado',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2563eb;">¡Gracias por registrarte en Turnio!</h2>
              
              <p>Hola ${formData.name},</p>
              
              <p>Nos complace confirmar que has sido registrado exitosamente para el acceso anticipado de Turnio.</p>
              
              <p>Te notificaremos tan pronto como la plataforma esté disponible para que puedas ser uno de los primeros en experimentar cómo Turnio puede transformar la gestión de tu negocio.</p>
              
              <h3 style="color: #374151;">¿Qué puedes esperar?</h3>
              <ul>
                <li>Notificación prioritaria cuando esté disponible</li>
                <li>Acceso exclusivo a funciones beta</li>
                <li>Soporte prioritario durante el lanzamiento</li>
              </ul>
              
              <p style="margin-top: 30px;">Saludos,<br>El equipo de Turnio</p>
              
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
              <p style="font-size: 12px; color: #6b7280;">
                Este email fue enviado a ${formData.email}. Si no solicitaste este registro, puedes ignorar este mensaje.
              </p>
            </div>
          `,
        }),
      })

      if (response.ok) {
        console.log('Resend email sent successfully')
      } else {
        console.error('Failed to send Resend email:', await response.text())
      }
    } catch (error) {
      console.error('Error sending Resend email:', error)
    }
  }

  if (isSubmitted) {
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

        {/* Success Message */}
        <main className="px-6 pb-16 pt-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ¡Gracias por registrarte!
              </h2>
              
              <p className="text-gray-600 mb-6">
                Te hemos enviado un email de confirmación. Te notificaremos cuando Turnio esté disponible.
              </p>
              
              <a 
                href="/" 
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Volver al inicio
              </a>
            </div>
          </div>
        </main>
      </div>
    )
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