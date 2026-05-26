import json

faqs = [
    {
        "q": "¿Cómo valoran o tasan el precio de mi vivienda en Gandía o Valencia?",
        "a": "Utilizamos datos de mercado en tiempo real, propiedades comparables vendidas recientemente y nuestra experiencia local para fijar un precio competitivo y realista, asegurando que vendas rápido sin perder dinero."
    },
    {
        "q": "¿Cuáles son los honorarios de la inmobiliaria y qué incluyen?",
        "a": "Incluyen la valoración técnica, home staging, reportaje fotográfico profesional, posicionamiento internacional, gestión de visitas y todos los trámites legales hasta la firma ante notario."
    },
    {
        "q": "¿Cuánto tiempo se tarda en vender un piso o casa en Gandía?",
        "a": "El tiempo medio varía según la propiedad, pero gracias a nuestra estrategia de marketing intensiva (Método MIA), solemos reducir los plazos del mercado a un promedio de 45 días."
    },
    {
        "q": "¿Qué gastos e impuestos debo pagar al vender mi casa?",
        "a": "Principalmente la Plusvalía Municipal (depende del ayuntamiento) y el IRPF sobre la ganancia patrimonial (19%-28%). Nuestro departamento fiscal le hará un cálculo exacto y le asesorará sobre exenciones (como reinversión en vivienda habitual o mayores de 65 años)."
    },
    {
        "q": "¿Qué documentos obligatorios necesito para vender mi propiedad?",
        "a": "Necesitará la escritura de propiedad, DNI, el último recibo del IBI, el certificado de eficiencia energética (CEE) y la cédula de habitabilidad. Nosotros nos encargamos de tramitar y gestionar toda esta documentación por usted."
    },
    {
        "q": "¿Debo reformar mi piso antes de ponerlo a la venta?",
        "a": "No siempre. Realizamos una auditoría inicial para recomendar solo aquellas mejoras estéticas, apoyadas por nuestro servicio de Home Staging, que aumentan realmente el valor de venta sin suponer gastos innecesarios."
    },
    {
        "q": "¿Qué ventajas tiene firmar un contrato de exclusividad inmobiliaria?",
        "a": "La exclusividad nos permite invertir el 100% en el marketing de su vivienda, destacarla en portales premium y evitar que el inmueble se devalúe por estar duplicado con precios diferentes en el mercado."
    },
    {
        "q": "¿Cómo consiguen compradores internacionales para propiedades de lujo?",
        "a": "Posicionamos las propiedades en portales europeos premium, realizamos campañas publicitarias segmentadas y trabajamos con una extensa red de inversores internacionales que buscan vivienda en Valencia y la Costa Blanca."
    },
    {
        "q": "¿Se encargan ustedes de todos los trámites legales y la notaría?",
        "a": "Absolutamente. Nuestro departamento jurídico redacta los contratos de arras, gestiona los certificados pendientes, liquida posibles cargas y coordina todo directamente con la notaría hasta la entrega de llaves."
    },
    {
        "q": "¿Qué pasa si firmo y mi casa no se vende en el plazo acordado?",
        "a": "Trabajamos a éxito. Si no logramos vender su propiedad en el plazo acordado, no le cobramos ningún tipo de honorario. Nosotros asumimos totalmente el riesgo de la inversión en marketing."
    }
]

items_html = ""
for index, faq in enumerate(faqs):
    active_class = " active" if index == 0 else ""
    aria_expanded = "true" if index == 0 else "false"
    num_str = f"0{index + 1}" if index < 9 else str(index + 1)
    items_html += f"""
        <!-- Item {index + 1} -->
        <div class="ess-faq-item{active_class}" data-index="{index}">
          <button class="ess-faq-question" type="button" aria-expanded="{aria_expanded}">
            <span class="ess-faq-num">{num_str}</span>
            <span class="ess-faq-q-text">{faq['q']}</span>
            <div class="ess-faq-toggle-icon"></div>
          </button>
          <div class="ess-faq-mobile-answer">
            <div class="ess-faq-mobile-inner">
              <p class="ess-faq-mobile-text">
                {faq['a']}
              </p>
            </div>
          </div>
        </div>"""

script_answers = ",\n".join(['    "' + faq["a"].replace('"', '\\"') + '"' for faq in faqs])

schema_items = ",\n".join(["""    {
      "@type": "Question",
      "name": \"""" + faq['q'] + """\",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": \"""" + faq['a'].replace('"', '\\"') + """\"
      }
    }""" for faq in faqs])

template = f"""<!-- ============================================================
     FAQ INTERACTIVA (Diseño Premium) — Essencia Inmobiliaria
     Pegar en: WordPress > Elementor > HTML Widget
     ============================================================ -->

<style>
/* ── Reset & variables ── */
.ess-faq-wrap * {{ box-sizing: border-box; margin: 0; padding: 0; }}
.ess-faq-wrap {{
  --black: #111827;
  --gray-light: #f9fafb;
  --gray-border: rgba(17, 24, 39, 0.08);
  --gray-mid: #9ca3af;
  --gray-text: #4b5563;
  --blue: #1fc0d9;
  font-family: 'Manrope', sans-serif;
  background-color: #ffffff;
  color: var(--black);
  width: 100%;
  overflow: hidden;
}}

.ess-faq-section {{
  max-width: 1280px;
  margin: 0 auto;
  padding: 8rem 1.5rem;
}}

/* ── Encabezado ── */
.ess-faq-header {{
  margin-bottom: 4rem;
}}
.ess-faq-badge {{
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--blue);
  margin-bottom: 1rem;
}}
.ess-faq-title {{
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.04em;
  color: var(--black);
}}

/* ── Grid Layout (Desktop Asymmetric) ── */
.ess-faq-grid {{
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}}
@media (min-width: 1024px) {{
  .ess-faq-grid {{
    grid-template-columns: 1.2fr 1fr;
    gap: 6rem;
    align-items: start;
  }}
}}

/* ── Lista de Preguntas (Izquierda) ── */
.ess-faq-list {{
  display: flex;
  flex-direction: column;
}}

.ess-faq-item {{
  position: relative;
  border-bottom: 1px solid var(--gray-border);
}}
.ess-faq-item:first-child {{
  border-top: 1px solid var(--gray-border);
}}

.ess-faq-question {{
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 2.5rem 0;
  cursor: pointer;
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}}
.ess-faq-item:not(.active) .ess-faq-question:hover {{
  opacity: 0.6;
}}

.ess-faq-num {{
  font-size: 0.9rem;
  font-weight: 800;
  color: var(--gray-mid);
  margin-top: 0.4rem;
  font-variant-numeric: tabular-nums;
}}

.ess-faq-q-text {{
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--black);
  transition: color 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}}

/* Estado activo en Desktop */
@media (min-width: 1024px) {{
  .ess-faq-item.active .ess-faq-q-text {{
    color: var(--blue);
  }}
  .ess-faq-item.active .ess-faq-num {{
    color: var(--blue);
  }}
}}

/* ── Panel de Respuestas (Derecha Desktop) ── */
.ess-faq-answer-panel {{
  display: none;
  position: sticky;
  top: 140px; /* Separación del menú fijo si lo hay */
  background: var(--gray-light);
  border-radius: 2.5rem;
  padding: 4rem 3rem;
  border: 1px solid rgba(17, 24, 39, 0.03);
}}
@media (min-width: 1024px) {{
  .ess-faq-answer-panel {{
    display: block;
  }}
}}

.ess-faq-panel-content {{
  opacity: 0;
  transform: translateY(15px);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}}
.ess-faq-panel-content.show {{
  opacity: 1;
  transform: translateY(0);
}}

.ess-faq-panel-icon {{
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(31,192,217,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}}
.ess-faq-panel-icon svg {{
  width: 24px;
  height: 24px;
  stroke: var(--blue);
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}}

.ess-faq-panel-text {{
  font-size: 1.15rem;
  line-height: 1.7;
  color: var(--gray-text);
  font-weight: 500;
}}

/* ── Accordion Mobile (Oculto en Desktop) ── */
.ess-faq-mobile-answer {{
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}}
@media (min-width: 1024px) {{
  .ess-faq-mobile-answer {{
    display: none !important;
  }}
}}
.ess-faq-item.active .ess-faq-mobile-answer {{
  grid-template-rows: 1fr;
}}
.ess-faq-mobile-inner {{
  overflow: hidden;
}}
.ess-faq-mobile-text {{
  padding-bottom: 2.5rem;
  padding-left: 2.85rem;
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--gray-text);
}}

/* Icono móvil (+ / -) animado con físicas */
.ess-faq-toggle-icon {{
  margin-left: auto;
  width: 20px;
  height: 20px;
  position: relative;
  flex-shrink: 0;
  margin-top: 0.3rem;
}}
@media (min-width: 1024px) {{
  .ess-faq-toggle-icon {{
    display: none;
  }}
}}
.ess-faq-toggle-icon::before,
.ess-faq-toggle-icon::after {{
  content: '';
  position: absolute;
  background: var(--black);
  border-radius: 2px;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s;
}}
.ess-faq-toggle-icon::before {{
  top: 9px; left: 0; right: 0; height: 2px;
}}
.ess-faq-toggle-icon::after {{
  left: 9px; top: 0; bottom: 0; width: 2px;
}}
.ess-faq-item.active .ess-faq-toggle-icon::after {{
  transform: rotate(90deg);
}}
.ess-faq-item.active .ess-faq-toggle-icon::before,
.ess-faq-item.active .ess-faq-toggle-icon::after {{
  background: var(--blue);
}}
</style>

<div class="ess-faq-wrap">
  <section class="ess-faq-section">
    <div class="ess-faq-header">
      <span class="ess-faq-badge">Transparencia Total</span>
      <h2 class="ess-faq-title">Dudas<br>Resueltas.</h2>
    </div>

    <div class="ess-faq-grid">
      <!-- Izquierda: Lista de Preguntas -->
      <div class="ess-faq-list" id="ess-faq-list">
{items_html}
      </div>

      <!-- Derecha: Panel Sticky (Solo Desktop) -->
      <div class="ess-faq-answer-panel">
        <div class="ess-faq-panel-content show" id="ess-faq-desktop-content">
          <div class="ess-faq-panel-icon">
            <svg viewBox="0 0 24 24">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <p class="ess-faq-panel-text" id="ess-faq-desktop-text">
            {faqs[0]['a']}
          </p>
        </div>
      </div>

    </div>
  </section>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {{
  const items = document.querySelectorAll('.ess-faq-item');
  const desktopText = document.getElementById('ess-faq-desktop-text');
  const desktopContent = document.getElementById('ess-faq-desktop-content');

  // Textos para desktop correspondientes a cada índice
  const answers = [
{script_answers}
  ];

  items.forEach((item, index) => {{
    const btn = item.querySelector('.ess-faq-question');
    
    btn.addEventListener('click', () => {{
      const isMobile = window.innerWidth < 1024;
      const isActive = item.classList.contains('active');

      if (isMobile) {{
        // Modo Acordeón (Móvil)
        if (isActive) {{
          item.classList.remove('active');
          btn.setAttribute('aria-expanded', 'false');
        }} else {{
          // Cerrar todos y abrir el clicado
          items.forEach(i => {{
            i.classList.remove('active');
            i.querySelector('.ess-faq-question').setAttribute('aria-expanded', 'false');
          }});
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        }}
      }} else {{
        // Modo Sticky Panel (Desktop)
        if (!isActive) {{
          // Cambiar estado activo en la lista
          items.forEach(i => {{
            i.classList.remove('active');
            i.querySelector('.ess-faq-question').setAttribute('aria-expanded', 'false');
          }});
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');

          // Animar salida del texto actual
          desktopContent.classList.remove('show');
          
          // Esperar y animar entrada del nuevo texto
          setTimeout(() => {{
            desktopText.textContent = answers[index];
            desktopContent.classList.add('show');
          }}, 300); // 300ms sincronizado con la transición CSS
        }}
      }}
    }});
  }});
}});
</script>

<!-- ============================================================
     SCHEMA FAQPage — Para bots de IA y Google
     ============================================================ -->
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
{schema_items}
  ]
}}
</script>
"""

with open('wp-sections/seccion-faq.html', 'w') as f:
    f.write(template)
print("seccion-faq.html updated successfully!")
