const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

export default async function EmailForm(email: string, code: string) {
    return await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: "¡Bienvenido a Turnio Early Access!",
            from_name: "Turnio",
            email,
            message: `¡Gracias por registrarte para el acceso anticipado a Turnio! Te mantendremos informado. Tu código es: ${code}`,
        }),
    });
}