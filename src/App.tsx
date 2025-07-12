import React, { useState } from 'react'
import { Calendar, Users, Sparkles, Clock } from 'lucide-react'
import { EmailForm } from './components/EmailForm'
import { DiscountForm } from './components/DiscountForm'
import { supabase } from './lib/supabase'

type Step = 'email' | 'discount'

function App() {
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
          // Email already exists, still proceed to discount step
          console.log('Email already registered')
        } else {
          throw error
        }
      }
    } catch (error) {
      console.error('Error saving email:', error)
      throw error
    } finally {
      setIsLoading(false)
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
            // Email already exists, still proceed to discount step
            console.log('Email already registered')
          } else {
            throw response.error
          }
          console.error('Supabase error:', response.error)
          throw response.error
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
      <header className="relative z-10 px-6 py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Turnio</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          
          {/* Hero Section */}
          {step === 'email' && (
            <div className="text-center space-y-12 animate-in fade-in duration-700">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  <Sparkles className="h-4 w-4" />
                  Próximamente
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  Gestiona turnos
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    sin complicaciones
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  La solución más simple para profesionales que quieren ofrecer 
                  reservas online a sus clientes.
                </p>
              </div>

              <EmailForm 
                onEmailSubmit={handleEmailSubmit} 
                isLoading={isLoading}
              />

              {/* Features Preview */}
              <div className="grid md:grid-cols-3 gap-8 mt-20 pt-20 border-t border-gray-100">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Calendario intuitivo
                  </h3>
                  <p className="text-gray-600">
                    Visualiza y gestiona todos tus turnos desde una interfaz limpia y moderna.
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Clientes felices
                  </h3>
                  <p className="text-gray-600">
                    Tus clientes pueden reservar turnos 24/7 sin necesidad de llamadas.
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Ahorra tiempo
                  </h3>
                  <p className="text-gray-600">
                    Automatiza recordatorios y confirmaciones para reducir ausencias.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Discount Step */}
          {step === 'discount' && (
            <div className="max-w-2xl mx-auto pt-20">
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
      <footer className="px-6 py-8 border-t border-gray-100 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Turnio. Simplificando la gestión de turnos para profesionales.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App