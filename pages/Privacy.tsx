import React from 'react';
import SEOHead from '../components/SEOHead';

const Privacy: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Política de Privacidad"
        description="Política de privacidad de Essencia Inmobiliaria. Información sobre el tratamiento de tus datos personales conforme al RGPD y la LOPDGDD."
        canonical="https://essenciainmobiliaria.com/privacy"
        noindex={true}
      />
      <div className="pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <span className="text-brand-blue-600 font-bold tracking-widest uppercase text-xs mb-3 block">Legal</span>
          <h1 className="text-5xl font-black text-editorial-black tracking-tight mb-4">Política de Privacidad</h1>
          <p className="text-gray-400 text-sm mb-12">Última actualización: marzo 2025</p>

          <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

            <section>
              <h2 className="text-2xl font-bold text-editorial-black mb-3">1. Responsable del tratamiento</h2>
              <p>
                <strong>Essencia Inmobiliaria</strong><br />
                C/ Sant Vicent Ferrer 24, 46701 Gandia, Valencia (España)<br />
                Teléfono: <a href="tel:+34647803355" className="text-brand-blue-600 hover:underline">+34 647 803 355</a><br />
                Email: <a href="mailto:santitorres@essenciainmobiliaria.com" className="text-brand-blue-600 hover:underline">santitorres@essenciainmobiliaria.com</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-editorial-black mb-3">2. Datos que recopilamos</h2>
              <p>A través del formulario de contacto recopilamos los siguientes datos personales:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                <li>Nombre y apellidos</li>
                <li>Dirección de correo electrónico</li>
                <li>Número de teléfono</li>
                <li>Mensaje libre que el usuario nos envía</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-editorial-black mb-3">3. Finalidad del tratamiento</h2>
              <p>Los datos recogidos se utilizan exclusivamente para:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                <li>Gestionar y responder las consultas recibidas a través del formulario de contacto.</li>
                <li>Facilitarle información sobre propiedades inmobiliarias y servicios relacionados.</li>
                <li>Cumplir con las obligaciones legales aplicables.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-editorial-black mb-3">4. Base legal</h2>
              <p>
                El tratamiento se basa en el <strong>consentimiento expreso</strong> del interesado (Art. 6.1.a RGPD) otorgado al enviar el formulario, así como en el <strong>interés legítimo</strong> en la gestión de relaciones comerciales (Art. 6.1.f RGPD).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-editorial-black mb-3">5. Conservación de los datos</h2>
              <p>
                Los datos se conservarán mientras sean necesarios para la finalidad para la que fueron recabados y, en todo caso, durante los plazos legalmente establecidos. Transcurrido ese período, serán eliminados de forma segura.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-editorial-black mb-3">6. Comunicación a terceros</h2>
              <p>
                No cedemos sus datos a terceros salvo obligación legal. El formulario de contacto redirige la información a través de WhatsApp Business, plataforma operada por Meta Platforms Ireland Ltd., sujeta a sus propias políticas de privacidad.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-editorial-black mb-3">7. Sus derechos</h2>
              <p>Puede ejercer en cualquier momento los siguientes derechos:</p>
              <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                <li><strong>Acceso</strong>: conocer qué datos tratamos sobre usted.</li>
                <li><strong>Rectificación</strong>: corregir datos inexactos.</li>
                <li><strong>Supresión</strong>: solicitar la eliminación de sus datos.</li>
                <li><strong>Oposición y limitación</strong>: oponerse a determinados tratamientos.</li>
                <li><strong>Portabilidad</strong>: recibir sus datos en formato estructurado.</li>
              </ul>
              <p className="mt-3">
                Para ejercer estos derechos, envíe un email a <a href="mailto:santitorres@essenciainmobiliaria.com" className="text-brand-blue-600 hover:underline">santitorres@essenciainmobiliaria.com</a> indicando el derecho que desea ejercer. También puede presentar una reclamación ante la <strong>Agencia Española de Protección de Datos</strong> (www.aepd.es).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-editorial-black mb-3">8. Seguridad</h2>
              <p>
                Adoptamos las medidas técnicas y organizativas necesarias para garantizar la seguridad de sus datos y evitar su alteración, pérdida, tratamiento o acceso no autorizado.
              </p>
            </section>

          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
