export default async function submitEmailConfirmation(email: string, code?: string, name?: string, profession?: string) {
    return await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
            subject: "¡Bienvenido a Turnio Early Access!",
            from_name: "Turnio",
            email,
            name,
            profession,
            message: '¡Gracias por registrarte para el acceso anticipado a Turnio! Te mantendremos informado.' + (code ? `Tu código es: ${code}` : ''),
            redirect: 'false'
        }),
    });
}