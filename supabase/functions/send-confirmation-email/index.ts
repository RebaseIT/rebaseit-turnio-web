// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { getEmailSubject, getEmailContent, type EmailData } from "./email-templates.ts"

interface EmailRequest {
  email: string
  promoCode?: string
}

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }

  try {
    const { email, promoCode }: EmailRequest = await req.json()

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { 
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        }
      )
    }

    // Get Resend API key from environment
    const RESEND_API_KEY = Deno.env.get('VITE_RESEND_API_KEY')
    
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not found in environment')
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { 
          status: 500,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        }
      )
    }

    // Prepare email content using templates
    const emailData: EmailData = { email, promoCode }
    const subject = getEmailSubject(!!promoCode)
    const htmlContent = getEmailContent(emailData)

    // Send email via Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Turnio <noreply@turnio.rebaseit.tech>',
        to: email,
        subject: subject,
        html: htmlContent,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Resend API error:', errorData)
      throw new Error(`Failed to send email: ${response.status}`)
    }

    const result = await response.json()
    console.log('Email sent successfully:', result)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Confirmation email sent successfully',
        emailId: result.id 
      }),
      { 
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
    )

  } catch (error) {
    console.error('Error sending confirmation email:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send confirmation email',
        details: error.message 
      }),
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
    )
  }
})
