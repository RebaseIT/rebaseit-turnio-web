import React from 'react'
import { X, AlertCircle } from 'lucide-react'

interface SnackbarProps {
  message: string
  isVisible: boolean
  onClose: () => void
  type?: 'error' | 'success' | 'info'
}

export function Snackbar({ message, isVisible, onClose, type = 'error' }: SnackbarProps) {
  if (!isVisible) return null

  const getBackgroundColor = () => {
    switch (type) {
      case 'error':
        return 'bg-red-500'
      case 'success':
        return 'bg-green-500'
      case 'info':
        return 'bg-blue-500'
      default:
        return 'bg-red-500'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'error':
        return <AlertCircle className="h-5 w-5" />
      case 'success':
        return <AlertCircle className="h-5 w-5" />
      case 'info':
        return <AlertCircle className="h-5 w-5" />
      default:
        return <AlertCircle className="h-5 w-5" />
    }
  }

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom-2 duration-300">
      <div className={`${getBackgroundColor()} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-[500px]`}>
        {getIcon()}
        <span className="flex-1 text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
} 