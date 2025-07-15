export default async function submitEmailmConfirmation(email: string, code?: string) {
    console.log('Submitting email confirmation', email, code, import.meta.env.VITE_WEB3FORMS_ACCESS_KEY)
    return await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
            subject: "¡Bienvenido a Turnio Early Access!",
            from_name: "Turnio",
            email,
            message: '¡Gracias por registrarte para el acceso anticipado a Turnio! Te mantendremos informado.' + (code ? `Tu código es: ${code}` : ''),
            redirect: 'false'
        }),
    });
}