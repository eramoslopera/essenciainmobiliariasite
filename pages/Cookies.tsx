import React from 'react';
import SEOHead from '../components/SEOHead';

const Cookies: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Política de Cookies"
        description="Política de cookies del sitio web de Essencia Inmobiliaria. Información sobre los tipos de cookies utilizadas y cómo gestionarlas."
        canonical="https://essenciainmobiliaria.com/cookies"
        noindex={true}
      />
      <div className="pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <span className="text-brand-blue-600 font-bold tracking-widest uppercase text-xs mb-3 block">Legal</span>
          <h1 className="text-5xl font-black text-editorial-black tracking-tight mb-4">Política de Cookies</h1>
          <p className="text-gray-400 text-sm mb-12">Última actualización: marzo 2025</p>

          <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

            <section>
              <h2 className="text-2xl font-bold text-editorial-black mb-3">1. ¿Qué son las cookies?</h2>
              <p>
                Las cookies son pequeños archivos de texto que los sitios web almacenan en su dispositivo cuando los visita. Permiten que el sitio recuerde sus preferencias y mejore su experiencia de navegación.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-editorial-black mb-3">2. Cookies que utilizamos</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-3 font-bold border border-gray-200">Cookie</th>
                      <th className="text-left p-3 font-bold border border-gray-200">Tipo</th>
                      <th className="text-left p-3 font-bold border border-gray-200">Finalidad</th>
                      <th className="text-left p-3 font-bold border border-gray-200">Duración</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border border-gray-200 font-mono text-xs">lang</td>
                      <td className="p-3 border border-gray-200">Técnica</td>
                      <td className="p-3 border border-gray-200">Guardar preferencia de idioma</td>
                      <td className="p-3 border border-gray-200">Sesión</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-3 border border-gray-200 font-mono text-xs">_ga, _gid</td>
                      <td className="p-3 border border-gray-200">Analítica</td>
                      <td className="p-3 border border-gray-200">Estadísticas de visitas (Google Analytics, si activo)</td>
                      <td className="p-3 border border-gray-200">2 años / 24h</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Este sitio no utiliza cookies de publicidad ni de seguimiento de terceros más allá de las indicadas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-editorial-black mb-3">3. Cómo gestionar las cookies</h2>
              <p>
                Puede configurar su navegador para aceptar, rechazar o eliminar las cookies en cualquier momento. La desactivación de determinadas cookies puede afectar a la funcionalidad del sitio.
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3 ml-4">
                <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de sitios</li>
                <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies y datos del sitio</li>
                <li><strong>Safari:</strong> Preferencias → Privacidad → Gestionar datos de sitios web</li>
                <li><strong>Edge:</strong> Configuración → Cookies y permisos del sitio</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-editorial-black mb-3">4. Actualizaciones de esta política</h2>
              <p>
                Podemos actualizar esta Política de Cookies en cualquier momento para reflejar cambios en las prácticas o en la normativa aplicable. Le recomendamos revisarla periódicamente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-editorial-black mb-3">5. Contacto</h2>
              <p>
                Para cualquier consulta sobre nuestra política de cookies, puede contactarnos en{' '}
                <a href="mailto:santitorres@essenciainmobiliaria.com" className="text-brand-blue-600 hover:underline">
                  santitorres@essenciainmobiliaria.com
                </a>.
              </p>
            </section>

          </div>
        </div>
      </div>
    </>
  );
};

export default Cookies;
