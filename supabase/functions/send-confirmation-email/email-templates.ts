// Email Templates for Turnio Early Access

export interface EmailData {
  email: string
  promoCode?: string
}

export const getEmailSubject = (): string => {
  return 'Gracias por contactarte con Turnio'
}

export const getEmailContent = (): string => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 30px; padding: 20px 0;">
        <h1 style="color: #2563eb; margin: 0; font-size: 32px; font-weight: bold;">Turnio</h1>
        <p style="color: #6b7280; margin: 10px 0; font-size: 16px;">Simplificando la gestión de turnos</p>
      </div>
      
      <!-- Main Content -->
      <div style="background-color: #f8fafc; padding: 30px; border-radius: 10px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
        <h2 style="color: #1f2937; margin-top: 0; font-size: 24px; font-weight: 600;">¡Gracias por enviarnos tu consulta!</h2>
        
        <p style="color: #374151; line-height: 1.6; font-size: 16px; margin-bottom: 20px;">
          ¡Hola! Gracias por enviarnos tu consulta. 
          Estamos encantados de poder ayudarte.
        </p>
        
        <p style="color: #374151; line-height: 1.6; font-size: 16px; margin-bottom: 20px;">
          Te responderemos lo antes posible.
        </p>

      </div>
      
      <!-- Call to Action -->
      <div style="text-align: center; margin: 30px 0;">
        <p style="color: #374151; font-size: 16px; margin-bottom: 15px;">
          <strong>¿Tenés preguntas?</strong>
        </p>
        <p style="color: #6b7280; font-size: 14px;">
          Responde a este email o contáctanos en 
          <a href="mailto:support@rebaseit.tech" style="color: #2563eb; text-decoration: none;">support@rebaseit.tech</a>
        </p>
      </div>
      
      <!-- Footer -->
      <div style="text-align: center; color: #6b7280; font-size: 14px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0 0 10px 0;">© 2025 Turnio. Todos los derechos reservados.</p>
        <p style="margin: 0; font-size: 12px;">
          <a href="https://turnio.rebaseit.tech" style="color: #6b7280; text-decoration: none;">turnio.rebaseit.tech</a>
        </p>
      </div>
    </div>
  `
}