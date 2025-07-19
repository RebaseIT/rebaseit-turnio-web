import React, { useState } from 'react'

export function SignupPage() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    profession: ''
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
          from_name: `${formData.name}`,
          from_email: formData.email,
          subject: 'Nuevo registro en Turnio - Acceso Anticipado',
          message: `
            Nuevo usuario registrado para acceso anticipado:
            
            Nombre: ${formData.name}
            Email: ${formData.email}
            Profesión: ${formData.profession}
            
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
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      if (!supabaseUrl) {
        console.warn('Supabase URL not found')
        return
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/send-confirmation-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          profession: formData.profession,
        }),
      })

      if (response.ok) {
        console.log('Confirmation email sent successfully via Supabase Edge Function')
      } else {
        console.error('Failed to send confirmation email:', await response.text())
      }
    } catch (error) {
      console.error('Error sending confirmation email:', error)
    }
  }

  if (isSubmitted) {
    return (
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              ¡Gracias por registrarte!
            </h2>
            
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Te hemos enviado un email de confirmación. Te notificaremos cuando Turnio esté disponible.
            </p>
            
            <a 
              href="/" 
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base hover:bg-blue-700 transition-colors"
            >
              Volver al inicio
            </a>
          </div>
        </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          
    {/* Hero Section */}
    <div className="text-center space-y-6 sm:space-y-8 mb-8 sm:mb-12">
      
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
        Únete a Turnio
        <br />
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          antes que nadie
        </span>
      </h1>
      
      <p className="text-lg sm:text-xl text-gray-600 max-w-xl mx-auto leading-relaxed px-4">
        Sé de los primeros en descubrir cómo Turnio puede transformar la manera en que gestionas tu negocio.
      </p>
    </div>

    {/* Form Section */}
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 text-left">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 text-left">
            Nombre *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-2 text-left">
            Profesión
          </label>
          <input
            type="text"
            id="profession"
            name="profession"
            value={formData.profession}
            onChange={handleInputChange}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Tu profesión"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Enviando...' : 'Registrarme'}
        </button>
      </form>
    </div>
  </div>
  )
} 