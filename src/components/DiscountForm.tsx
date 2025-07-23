import { useState } from 'react'
import { Gift, Check, Loader2, Copy, CheckCircle } from 'lucide-react'
import { Snackbar } from './Snackbar'
import submitEmailConfirmation from '../lib/web3froms'

interface DiscountFormProps {
  email: string
  onDiscountRequest: (promoCode: string) => Promise<void>
  onSubmitEmailWithoutDiscount: () => Promise<void>
  isLoading: boolean
  name: string
  profession: string
}

export function DiscountForm({ email, onDiscountRequest, onSubmitEmailWithoutDiscount, isLoading, name, profession }: DiscountFormProps) {
  const [wantsDiscount, setWantsDiscount] = useState<boolean | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generatePromoCode = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'
    
    // Generate 4 random letters
    let randomLetters = ''
    for (let i = 0; i < 4; i++) {
      randomLetters += letters.charAt(Math.floor(Math.random() * letters.length))
    }
    
    // Generate 4 random numbers
    let randomNumbers = ''
    for (let i = 0; i < 4; i++) {
      randomNumbers += numbers.charAt(Math.floor(Math.random() * letters.length))
    }
    
    return `TURNIO10-${randomLetters}${randomNumbers}`
  }

  const handleDiscountResponse = async (wants: boolean) => {
    setWantsDiscount(wants)
    setError(null) // Clear any previous errors
    
    try {
      if (wants) {
          const generatedCode = generatePromoCode()
          await onDiscountRequest(generatedCode)
          setPromoCode(generatedCode)
          await submitEmailConfirmation(email, generatedCode, name, profession)
          setSubmitted(true)
      } else {
          await onSubmitEmailWithoutDiscount()
          await submitEmailConfirmation(email, undefined, name, profession)
          setSubmitted(true)
      }

    } catch (error) {
      console.error('Error submitting email:', error)
      setError('Error al procesar tu solicitud. Inténtalo de nuevo.')
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(promoCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Error copying to clipboard:', error)
    }
  }

  if (submitted) {
    return (
      <>
        <div className="text-center space-y-6 animate-in fade-in duration-500">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              ¡Perfecto!
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {wantsDiscount 
                ? 'Aquí tienes tu código de descuento exclusivo:'
                : 'Te notificaremos cuando Turnio esté disponible.'
              }
            </p>
            
            {wantsDiscount && promoCode && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6 max-w-sm mx-auto">
                <div className="text-center space-y-4">
                  <div className="text-sm text-gray-600 font-medium">
                    Tu código promocional
                  </div>
                  <div className="bg-white border-2 border-blue-300 rounded-lg p-4">
                    <div className="text-3xl font-bold text-blue-600 tracking-wider font-mono">
                      {promoCode}
                    </div>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center justify-center gap-2 bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 mx-auto"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        ¡Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copiar código
                      </>
                    )}
                  </button>
                  <p className="text-xs text-gray-500">
                    Guarda este código para cuando lancemos Turnio
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <Snackbar
          message={error || ''}
          isVisible={!!error}
          onClose={() => setError(null)}
          type="error"
        />
      </>
    )
  }

  return (
    <>
      <div className="text-center space-y-8 animate-in fade-in duration-500">
        <div>
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Gift className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            ¡Gracias {email.split('@')[0]}!
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            ¿Te gustaría recibir un código de descuento para cuando lancemos Turnio?
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 max-w-sm mx-auto">
          <button
            onClick={() => handleDiscountResponse(true)}
            disabled={isLoading}
            className="flex-1 bg-blue-800 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Sí, quiero descuento'
            )}
          </button>
          <button
            onClick={() => handleDiscountResponse(false)}
            disabled={isLoading}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            No, gracias
          </button>
        </div>
      </div>
      
      <Snackbar
        message={error || ''}
        isVisible={!!error}
        onClose={() => setError(null)}
        type="error"
      />
    </>
  )
}