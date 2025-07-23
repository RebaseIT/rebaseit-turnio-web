import { useEffect } from 'react'
import { Calendar, Users, Sparkles, Clock } from 'lucide-react'
import { SignupPage } from './components/SignupPage';
import { useIsMobile } from './hooks/useIsMobile';

function App() {

  const isMobile = useIsMobile(768)

  useEffect(() => {
    const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID;
    if(!websiteId) { 
      console.warn('No website ID found')
      return 
    }
    const script = document.createElement("script");
    script.defer = true;
    script.setAttribute('data-website-id', websiteId);
    script.src = 'https://cloud.umami.is/script.js';
    document.head.appendChild(script);
  }, []);



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/Turnio_Blue.svg" alt="Turnio" className="h-6" />
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#como-funciona" 
              className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('como-funciona')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              Cómo funciona
            </a>
            <a 
              href="#que-ofrecemos" 
              className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('que-ofrecemos')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              Qué ofrecemos
            </a>
            <a 
              href="#planes" 
              className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('planes')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              Planes
            </a>
          </nav>
          
          { !isMobile && <a 
            href="#signup" 
            className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('signup')?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }}
          >
            Quiero acceso anticipado
          </a>}
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 pb-16 pt-16">
        <div className="max-w-6xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center space-y-12 animate-in fade-in duration-700">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  <Sparkles className="h-4 w-4" />
                  Próximamente
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  Gestioná turnos
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

              <div className="text-center">
                <a 
                  href="#signup" 
                  className="inline-flex items-center gap-2 bg-blue-800 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('signup')?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }}
                >
                  Quiero acceso anticipado
                </a>
                <p className="text-gray-500 text-sm mt-4">
                  Unite a la lista de espera y obtené un descuento!
                </p>
              </div>

              {/* Cómo funciona Section */}
              <section id="como-funciona" className="mt-8 pt-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Cómo funciona
                  </h2>
                </div>
                
                <div className="grid md:grid-cols-4 gap-8">
                  <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-blue-600 font-bold text-lg">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                      Creá una cuenta en Turnio
                    </h3>
                    <p className="text-gray-600 text-center">
                      Nos compartís tu email y el nombre de tu local.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-blue-600 font-bold text-lg">2</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                      Configurá tu disponibilidad
                    </h3>
                    <p className="text-gray-600 text-center">
                      Nos comentás en qué días y horarios trabajás durante la semana.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-blue-600 font-bold text-lg">3</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                      Cargá tus servicios
                    </h3>
                    <p className="text-gray-600 text-center">
                      Nos especificás el nombre y la duración del servicio junto con otros campos extra.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-blue-600 font-bold text-lg">4</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                      Generamos tu link de reserva
                    </h3>
                    <p className="text-gray-600 text-center">
                      Compartí dicho link en tus redes sociales y listo! Tus clientes ya pueden reservar sus turnos!
                    </p>
                  </div>
                </div>
              </section>

              {/* Qué ofrecemos Section */}
              <section id="que-ofrecemos" className="mt-32 pt-20">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Qué ofrecemos
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Nuestro objetivo en Turnio es que la gestión de tu calendario sea fácil y ágil.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Calendar className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Calendario intuitivo
                    </h3>
                    <p className="text-gray-600">
                      Visualizá y gestioná todos tus turnos desde una interfaz limpia y moderna.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Users className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Clientes felices
                    </h3>
                    <p className="text-gray-600">
                      Tus clientes pueden reservar turnos 24/7 sin necesidad de llamadas.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Clock className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Ahorrá tiempo
                    </h3>
                    <p className="text-gray-600">
                      Automatizá recordatorios y confirmaciones para reducir ausencias.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="h-8 w-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Historial por cliente
                    </h3>
                    <p className="text-gray-600">
                      Historial por cliente con notas fechadas.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Gestión masiva
                    </h3>
                    <p className="text-gray-600">
                      Gestioná múltiples reservas de una vez para todos tus clientes.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="h-8 w-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Estadísticas completas
                    </h3>
                    <p className="text-gray-600">
                      Reportes detallados de clientes, prestadores y especialistas.
                    </p>
                  </div>
                </div>
              </section>

              {/* Planes Section */}
              <section id="planes" className="mt-32 pt-20">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Planes
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Estos son las distintas suscripciones que ofrecemos actualmente en Turnio.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 relative flex flex-col">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                      Básico
                    </h3>
                    <ul className="space-y-4 mb-8 flex-grow">
                      <li className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-blue-800 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-700 text-left">Turnos ilimitados</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-blue-800 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-700 text-left">Notificaciones por email</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-blue-800 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-700 text-left">Un calendario básico</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-blue-800 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-700 text-left">Soporte por email</span>
                      </li>
                    </ul>
                                          <div className="text-center mt-auto">
                        <button 
                          className="w-full bg-blue-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('signup')?.scrollIntoView({ 
                              behavior: 'smooth',
                              block: 'start'
                            });
                          }}
                        >
                          Sólo por $29.999
                        </button>
                      </div>
                  </div>

                  <div className="bg-white rounded-xl p-8 shadow-sm border border-purple-200 relative flex flex-col">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Users className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                      Premium
                    </h3>
                    <ul className="space-y-4 mb-8 flex-grow">
                      <li className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-700 text-left">Todo lo de Básico</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-700 text-left">Gestión avanzada de disponibilidad</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-700 text-left">Gestión avanzada de turnos</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-700 text-left">Hasta 10 calendarios</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-700 text-left">Soporte en línea de 8:00 a 20:00</span>
                      </li>
                    </ul>
                                          <div className="text-center mt-auto">
                        <button 
                          className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('signup')?.scrollIntoView({ 
                              behavior: 'smooth',
                              block: 'start'
                            });
                          }}
                        >
                          Sólo por $74.999
                        </button>
                      </div>
                  </div>

                  <div className="bg-white rounded-xl p-8 shadow-sm border border-orange-200 relative flex flex-col">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="h-8 w-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                      Enterprise
                    </h3>
                    <ul className="space-y-4 mb-8 flex-grow">
                      <li className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-orange-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-700 text-left">Todo lo de Premium</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-orange-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-700 text-left">API personalizada</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-orange-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-700 text-left">Soporte 24/7 dedicado</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-orange-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-700 text-left">Integración con sistemas</span>
                      </li>
                    </ul>
                      <div className="text-center mt-auto">
                        <button 
                          className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('signup')?.scrollIntoView({ 
                              behavior: 'smooth',
                              block: 'start'
                            });
                          }}
                        >
                          Contactanos
                        </button>
                      </div>
                  </div>
                </div>
              </section>

              {/* Signup Section */}
              <section id="signup" className="mt-32 pt-20">
                <SignupPage />
              </section>
            </div>
        </div>
      </main>

      {/* Footer */}
      <footer id="footer" className="bg-gray-900 text-gray-300 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Column 1: Turnio */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img src="/Turnio_White.svg" alt="Turnio" className="h-6" />
              </div>
              <p className="text-gray-400 text-sm">
                Gestioná tus turnos sin complicaciones
              </p>
              <div className="flex items-center gap-4">
                <a href="mailto:sales@rebaseit.tech" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/turnio.app/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com/people/Turnioapp/61578203716153/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Navegación */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold">Navegación</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#como-funciona" 
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('como-funciona')?.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }}
                  >
                    Cómo funciona
                  </a>
                </li>
                <li>
                  <a 
                    href="#que-ofrecemos" 
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('que-ofrecemos')?.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }}
                  >
                    Qué ofrecemos
                  </a>
                </li>
                <li>
                  <a 
                    href="#planes" 
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('planes')?.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }}
                  >
                    Planes
                  </a>
                </li>
                <li>
                  <a href="#contacto" className="text-gray-400 hover:text-white transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 pt-8">
            <p className="text-center text-gray-400 text-sm">
              © 2025 Rebase IT. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App