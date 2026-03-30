import React from 'react';
import SEOHead from '../components/SEOHead';

const Terms: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Aviso Legal y Términos de Uso"
        description="Aviso legal y condiciones de uso del sitio web de Essencia Inmobiliaria, agencia inmobiliaria en Gandia, Valencia."
        canonical="https://essenciainmobiliaria.com/terms"
        noindex={true}
      />
      <div className="pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <span className="text-brand-blue-600 font-bold tracking-widest uppercase text-xs mb-3 block">Legal</span>
          <h1 className="text-5xl font-black text-editorial-black tracking-tight mb-4">Aviso Legal</h1>
          <p className="text-gray-400 text-sm mb-12">Última actualización: marzo 2025</p>

          <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

            <section>
              <h2 className="text-2xl font-bold text-editorial-black mb-3">1. Datos identificativos</h2>
              <p>
                En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), le informamos de los siguientes datos:
              </p>
              <ul className="list-none space-y-1 mt-3 ml-0">
                <li><strong>Denominación:</strong> Essencia Inmobiliaria</li>
                <li><strong>Domicilio:</strong> C/ Sant Vicent Ferrer 24, 46701 Gandia, Valencia (España)</li>
                <li><strong>Teléfono:</strong> <a href="tel:+34647803355" className="text-brand-blue-600 hover:underline">+34 647 803 355</a></li>
                <li><strong>Email:</strong> <a href="mailto:santitorres@essenciainmobiliaria.com" className="text-brand-blue-600 hover:underline">santitorres@essenciainmobiliaria.com</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-editorial-black mb-3">2. Objeto y ámbito de aplicación</h2>
              <p>
                El presente Aviso Legal regula el acceso y la utilización del sitio web <strong>essenciainmobiliaria.com</strong> (en adelante, «el Sitio»). El acceso al Sitio implica la aceptación plena de las presentes condiciones.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-editorial-black mb-3">3. Propiedad intelectual</h2>
              <p>
                Todos los contenidos del Sitio (textos, imágenes, diseño gráfico, código fuente, logotipos y demás elementos) son propiedad de Essencia Inmobiliaria o de terceros que han autorizado su uso. Queda prohibida su reproducción, distribución, comunicación pública o transformación sin autorización expresa.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-editorial-black mb-3">4. Información sobre propiedades</h2>
              <p>
                Las características, precios y disponibilidad de las propiedades publicadas en el Sitio tienen carácter informativo y pueden estar sujetos a cambios sin previo aviso. Essencia Inmobiliaria no garantiza la exactitud o integridad de dicha información y no se hace responsable de los errores u omisiones que pueda contener.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-editorial-black mb-3">5. Limitación de responsabilidad</h2>
              <p>
                Essencia Inmobiliaria no será responsable de los daños o perjuicios derivados del uso del Sitio, de la imposibilidad de acceder al mismo, ni de la fiabilidad de la información contenida en él. El usuario utiliza el Sitio bajo su propia responsabilidad.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-editorial-black mb-3">6. Política de enlaces</h2>
              <p>
                El Sitio puede incluir enlaces a sitios web de terceros. Essencia Inmobiliaria no controla dichos sitios y no se responsabiliza de sus contenidos ni de su política de privacidad.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-editorial-black mb-3">7. Legislación aplicable</h2>
              <p>
                El presente Aviso Legal se rige por la legislación española. Para la resolución de cualquier controversia, las partes se someten a los juzgados y tribunales de Gandia, salvo que la normativa aplicable establezca otro fuero.
              </p>
            </section>

          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
