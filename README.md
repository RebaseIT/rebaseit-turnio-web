# Turnio Early Access - Email Functionality

This guide explains how to deploy and manage the email confirmation functionality using Supabase Edge Functions and Resend.

## Overview

The email system consists of:
- **Supabase Edge Function**: `send-confirmation-email` - Handles email sending server-side
- **Frontend Integration**: React component that calls the Edge Function
- **Email Templates**: Professional HTML templates with promo codes
- **Dual Email Service**: Web3Forms + Resend for redundancy

## Prerequisites

- Supabase project set up
- Resend account with API key
- Web3Forms account with access key
- Node.js and Supabase CLI installed

## Environment Variables

### Frontend (.env)
```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_WEB3FORMS_ACCESS_KEY=your-web3forms-key
```

### Supabase Secrets
```bash
supabase secrets set VITE_RESEND_API_KEY=your_resend_api_key_here
```

## Deployment Steps

### 1. Deploy the Edge Function

```bash
# Navigate to your project root
cd turnix-early-access

# Deploy the send-confirmation-email function
supabase functions deploy send-confirmation-email
```

### 2. Verify Environment Variables

```bash
# Check current secrets
supabase secrets list

# Set Resend API key if not already set
supabase secrets set VITE_RESEND_API_KEY=your_resend_api_key_here
```

### 3. Test the Function

```bash
# Test the function directly
curl -X POST https://your-project-ref.supabase.co/functions/v1/send-confirmation-email \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-anon-key" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "profession": "Developer",
    "promoCode": "TURNIO10-ABCD1234"
  }'
```

## Function Structure

### Edge Function: `supabase/functions/send-confirmation-email/`

```
send-confirmation-email/
├── index.ts              # Main function logic
├── email-templates.ts    # HTML email templates
├── deno.json            # Deno configuration
└── .npmrc              # NPM configuration
```

### Key Features

- **CORS Handling**: Proper CORS headers for browser requests
- **Error Handling**: Comprehensive error responses
- **Email Templates**: Professional HTML templates with branding
- **Promo Code Support**: Dynamic promo code generation and inclusion
- **Dual Service**: Web3Forms + Resend for reliability

## Email Template Features

### Template Structure
- **Header**: Turnio branding and logo
- **Personalized Greeting**: Uses user's name
- **Registration Confirmation**: Welcome message
- **Profession Display**: Shows user's profession if provided
- **Promo Code Section**: Special discount code (if applicable)
- **Expectations List**: What users can expect
- **Contact Information**: Support email and links
- **Footer**: Copyright and legal information

### Promo Code Format
```
TURNIO10-XXXX1234
```
- `TURNIO10-`: Fixed prefix
- `XXXX`: 4 random letters
- `1234`: 4 random numbers

## Frontend Integration

### SignupPage Component

The `src/components/SignupPage.tsx` component:

1. **Generates Promo Code**: Creates unique discount codes
2. **Sends Dual Emails**: Both Web3Forms and Resend
3. **Handles Loading States**: Shows loading during email sending
4. **Error Handling**: Graceful error handling and user feedback

### Email Flow

```javascript
// 1. Generate promo code
const promoCode = generatePromoCode()

// 2. Send via Web3Forms (backup)
await sendWeb3FormsEmail(promoCode)

// 3. Send via Supabase Edge Function (Resend)
await sendResendEmail(promoCode)
```

## Troubleshooting

### Common Issues

#### 1. CORS Errors
**Problem**: Browser blocking API calls to Resend
**Solution**: Use Supabase Edge Function (already implemented)

#### 2. Environment Variables Missing
**Problem**: Function can't find API keys
**Solution**: 
```bash
supabase secrets set VITE_RESEND_API_KEY=your_key_here
```

#### 3. Function Not Deployed
**Problem**: 404 errors when calling function
**Solution**: 
```bash
supabase functions deploy send-confirmation-email
```

#### 4. Email Not Sending
**Problem**: Emails not being delivered
**Solution**: 
- Check Resend API key is valid
- Verify sender email domain is verified in Resend
- Check function logs: `supabase functions logs send-confirmation-email`

### Debugging

#### Check Function Logs
```bash
supabase functions logs send-confirmation-email --follow
```

#### Test Function Locally
```bash
supabase functions serve send-confirmation-email --env-file .env.local
```

#### Verify Environment Variables
```bash
supabase secrets list
```

## Email Template Customization

### Update Email Content

Edit `supabase/functions/send-confirmation-email/email-templates.ts`:

```typescript
export const getEmailContent = (data: EmailData): string => {
  const { email, name, profession, promoCode } = data
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <!-- Your custom HTML here -->
    </div>
  `
}
```

### Update Email Subject

```typescript
export const getEmailSubject = (hasPromoCode: boolean): string => {
  return hasPromoCode 
    ? '¡Bienvenido a Turnio! - Tu código especial'
    : '¡Bienvenido a Turnio!'
}
```

## Security Considerations

- ✅ **API Keys Secured**: Stored in Supabase secrets, not exposed to frontend
- ✅ **CORS Protected**: Proper CORS headers prevent unauthorized access
- ✅ **Input Validation**: Email and name validation in function
- ✅ **Error Handling**: No sensitive information leaked in errors

## Monitoring

### Function Metrics
- Monitor function invocations in Supabase Dashboard
- Check error rates and response times
- Set up alerts for function failures

### Email Delivery
- Monitor email delivery rates in Resend Dashboard
- Track bounce rates and spam complaints
- Verify sender reputation

## Cost Considerations

### Supabase Edge Functions
- **Free Tier**: 500,000 invocations/month
- **Paid Tier**: $0.000002 per invocation after free tier

### Resend
- **Free Tier**: 3,000 emails/month
- **Paid Tier**: $0.80 per 1,000 emails after free tier

## Best Practices

1. **Always test in development first**
2. **Monitor function logs regularly**
3. **Keep API keys secure and rotate periodically**
4. **Use environment variables for configuration**
5. **Implement proper error handling**
6. **Test email templates across different email clients**

## Support

For issues with:
- **Supabase Functions**: Check Supabase documentation
- **Resend API**: Contact Resend support
- **Email Templates**: Test in email preview tools
- **CORS Issues**: Verify function deployment and headers

## Quick Deploy Commands

```bash
# Full deployment
supabase functions deploy send-confirmation-email
supabase secrets set VITE_RESEND_API_KEY=your_key_here

# Test deployment
curl -X POST https://your-project-ref.supabase.co/functions/v1/send-confirmation-email \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-anon-key" \
  -d '{"email":"test@example.com","name":"Test User","profession":"Developer","promoCode":"TURNIO10-ABCD1234"}'
``` 