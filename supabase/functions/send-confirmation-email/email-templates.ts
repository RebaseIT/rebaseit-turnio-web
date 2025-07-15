// Email Templates for Turnio Early Access

export interface EmailData {
  email: string
  promoCode?: string
}

export const getEmailSubject = (hasPromoCode: boolean): string => {
  return hasPromoCode 
    ? '¡Bienvenido a Turnio Early Access! - Tu código especial'
    : '¡Bienvenido a Turnio Early Access!'
}

export const getEmailContent = (data: EmailData): string => {
  const { email, promoCode } = data
  const hasPromoCode = !!promoCode

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 30px; padding: 20px 0;">
        <h1 style="color: #2563eb; margin: 0; font-size: 32px; font-weight: bold;">Turnio</h1>
        <p style="color: #6b7280; margin: 10px 0; font-size: 16px;">Simplificando la gestión de turnos</p>
      </div>
      
      <!-- Main Content -->
      <div style="background-color: #f8fafc; padding: 30px; border-radius: 10px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
        <h2 style="color: #1f2937; margin-top: 0; font-size: 24px; font-weight: 600;">¡Gracias por registrarte!</h2>
        
        <p style="color: #374151; line-height: 1.6; font-size: 16px; margin-bottom: 20px;">
          ¡Hola! Gracias por registrarte para el acceso anticipado a Turnio. 
          Estamos emocionados de tenerte como parte de nuestra comunidad.
        </p>
        
        <p style="color: #374151; line-height: 1.6; font-size: 16px; margin-bottom: 20px;">
          Te mantendremos informado sobre el lanzamiento y todas las novedades exclusivas.
        </p>

        <p style="color: #374151; line-height: 1.6; font-size: 16px; margin-bottom: 20px;">
          <strong>¿Qué puedes esperar?</strong>
        </p>
        
        <ul style="color: #374151; line-height: 1.6; font-size: 16px; margin-bottom: 20px; padding-left: 20px;">
          <li>Notificaciones sobre el lanzamiento</li>
          <li>Acceso prioritario cuando esté disponible</li>
          <li>Ofertas especiales para early adopters</li>
          <li>Actualizaciones sobre nuevas funcionalidades</li>
        </ul>
        
        ${hasPromoCode ? `
          <!-- Promo Code Section -->
          <div style="background-color: #dbeafe; border: 2px solid #3b82f6; border-radius: 8px; padding: 20px; margin: 25px 0; text-align: center;">
            <h3 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">🎉 Tu código especial de descuento:</h3>
            <p style="color: #1e40af; font-size: 24px; font-weight: bold; margin: 0; letter-spacing: 2px;">${promoCode}</p>
            <p style="color: #1e40af; font-size: 14px; margin: 10px 0 0 0; opacity: 0.8;">
              Guarda este código para cuando esté disponible
            </p>
          </div>
        ` : ''}
      </div>
      
      <!-- Call to Action -->
      <div style="text-align: center; margin: 30px 0;">
        <p style="color: #374151; font-size: 16px; margin-bottom: 15px;">
          <strong>¿Tienes preguntas?</strong>
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