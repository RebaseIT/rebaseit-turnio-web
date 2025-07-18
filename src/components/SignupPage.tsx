import React, { useState } from 'react'
import { Calendar, ArrowLeft } from 'lucide-react'
import { EmailForm } from './EmailForm'
import { DiscountForm } from './DiscountForm'
import { supabase } from '../lib/supabase'

type Step = 'email' | 'discount'

export function SignupPage() {
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailWithoutDiscount = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from('leads')
        .insert([{ 
          email,
          wants_discount: false
         }])

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          console.log('Email already registered')
        } else {
          throw error
        }
      } else {
        // Send confirmation email via Supabase Edge Function
        await sendEmailConfirmation(email)
      }
    } catch (error) {
      console.error('Error saving email:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const sendEmailConfirmation = async (email: string, promoCode?: string) => {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const functionUrl = `${supabaseUrl}/functions/v1/send-confirmation-email`
      
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ email, promoCode}),
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

  const handleEmailSubmit = async (emailValue: string) => {
    setEmail(emailValue)
    setStep('discount')
  }

  const handleDiscountRequest = async (promoCode: string) => {
    setIsLoading(true)
    try {
      const response = await supabase
        .from('leads')
        .insert({ 
          email,
          wants_discount: true,
          promo_code: promoCode,
          updated_at: new Date().toISOString()
        }, {
          count: 'exact'
        })
        if (response.error) {
          if (response.error.code === '23505') { // Unique constraint violation
            console.log('Email already registered')
          } else {
            throw response.error
          }
          console.error('Supabase error:', response.error)
          throw response.error
        } else {
          // Send confirmation email via Supabase Edge Function with promo code
          await sendEmailConfirmation(email, promoCode)
        }
    } catch (error) {
      console.error('Error updating discount preference:', error)
      throw error
    } finally {
      setIsLoading(false)
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
          {step === 'email' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <EmailForm 
                onEmailSubmit={handleEmailSubmit} 
                isLoading={isLoading}
              />
            </div>
          )}

          {/* Discount Step */}
          {step === 'discount' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <DiscountForm 
                email={email}
                onDiscountRequest={handleDiscountRequest}
                onSubmitEmailWithoutDiscount={handleEmailWithoutDiscount}
                isLoading={isLoading}
              />
            </div>
          )}
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