<div align="center">
  <img width="1200" height="475" alt="Essencia Inmobiliaria Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Essencia Inmobiliaria — Portal Web Híbrido (React + WordPress)

Este repositorio contiene la arquitectura digital completa de **Essencia Inmobiliaria**, una inmobiliaria premium especializada en viviendas en Gandía y la comarca de La Safor (Valencia). 

El proyecto está diseñado bajo un modelo **híbrido**:
1. **Aplicación React (Vite + TypeScript + Tailwind CSS):** La aplicación interactiva principal, de alto rendimiento y diseño editorial premium, alojada en Vercel y conectada en tiempo real al CRM de Inmovilla.
2. **Secciones de WordPress (wp-sections/):** Fragmentos HTML/CSS optimizados y autocontenidos que se generan mediante scripts de automatización para ser copiados y pegados directamente en el maquetador **Elementor** de WordPress, garantizando que el sitio corporativo comparta la misma estética de lujo.

---

## 🛠️ Arquitectura y Estructura del Repositorio

El repositorio está organizado de la siguiente manera:

```text
├── api/                       # Endpoints y Proxy Serverless (Vercel Functions)
│   ├── feed.ts                # Proxy XML de Inmovilla para evitar políticas de CORS
│   └── image.ts               # Proxy/Optimizador de imágenes de propiedades
├── components/                # Componentes React reutilizables y secciones
│   ├── ui/                    # Componentes base de UI de bajo nivel
│   ├── AISection.tsx          # Sección "Expertos en IA" con logos de portales
│   ├── CasosExitoSection.tsx  # Sección de casos de éxito y reseñas de Google (4.6 / 349 reseñas)
│   ├── FAQSection.tsx         # Sección dinámica de preguntas frecuentes
│   ├── PropiedadesSection.tsx # Buscador interactivo por tipologías e inmuebles rebajados
│   ├── PropiedadesVendidasSection.tsx # Sección de inmuebles vendidos y reservados (CRM + Fallback)
│   ├── SchemaMarkup.tsx       # Generador de datos estructurados JSON-LD para Google (LocalBusiness)
│   └── ...
├── pages/                     # Páginas de la aplicación (enrutadas con React Router)
│   ├── Home.tsx               # Página de inicio que ensambla las secciones principales
│   ├── Properties.tsx         # Buscador y catálogo completo de propiedades
│   ├── PropertyDetail.tsx     # Ficha detallada del inmueble con mapa interactivo y galería
│   ├── Sell.tsx               # Landing page enfocada en captación ("Vender con Método MIA")
│   └── Valuation.tsx          # Formulario interactivo de valoración gratuita de vivienda
├── wp-sections/               # HTML autocontenido listo para copiar y pegar en WordPress
│   ├── seccion-hero.html      # Cabecera principal
│   ├── seccion-casos-exito.html # Testimonios y reseñas
│   ├── seccion-expertos-ia.html # Sección con logos optimizados (Idealista, Fotocasa, etc.)
│   ├── schema-realestateagent.html # Schema SEO consolidado listo para inyectar en WordPress
│   └── ...
├── wordpress-export/          # Copias de seguridad adicionales de secciones WP
├── src/
│   ├── data/                  # Datos locales estáticos
│   │   ├── blogPosts.ts       # Artículos del blog corporativo
│   │   └── fallbackProperties.ts # Propiedades vendidas/reservadas de respaldo
│   ├── types/                 # Definiciones de tipos TypeScript (ej: Property)
│   └── utils/                 # Scripts de utilidad
│       ├── xmlParser.ts       # Conversor y parser de XML Kyero a objetos de React
│       └── translator.ts      # Traductor de características del inmueble
├── export_remaining_wp.py     # Script Python para exportar componentes React a HTML estático
├── generate-faq.py            # Script Python para generar el acordeón de FAQs en HTML
├── tailwind.config.js         # Configuración del motor de diseño CSS con los colores corporativos
└── package.json               # Dependencias del proyecto
```

---

## ⚡ Ejecución en Local

Sigue estos pasos para levantar el entorno de desarrollo local:

### Requisitos Previos
- **Node.js** (versión 18 o superior recomendada)
- **NPM** (incluido con Node.js)

### Instrucciones
1. **Instalar Dependencias:**
   ```bash
   npm install
   ```
2. **Variables de Entorno (Opcional):**
   Crea un archivo `.env.local` en la raíz si deseas configurar credenciales o integraciones adicionales de Vercel.
3. **Arrancar el Servidor de Desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador para ver la web localmente.
4. **Construir para Producción:**
   ```bash
   npm run build
   ```
   Esto genera los archivos compilados listos para desplegar en la carpeta `/dist`.

---

## 🔌 Integración con el CRM de Inmovilla

El catálogo de propiedades activas, así como la sección de vendidos y reservados, están conectados directamente con **Inmovilla** mediante un feed XML en formato Kyero.

* **Proxy Serverless (`/api/feed`):** Debido a que el dominio del CRM (`apinmo.com`) bloquea peticiones de navegadores externos (CORS), la aplicación React consulta `/api/feed`. Esta ruta del servidor descarga el XML en segundo plano, añade cabeceras permisivas y lo devuelve al navegador.
* **Mapeo de Estados (`xmlParser.ts`):** 
  * Las propiedades con `<state>Free</state>` se consideran **Disponibles**.
  * Las propiedades con `<state>sold</state>`, `<state>stc</state>` o `<state>sold stc</state>` se consideran **Vendidas**.
  * Las propiedades con `<state>reserved</state>`, `<state>under offer</state>` o `<state>reserved-sold</state>` se consideran **Reservadas**.

> [!IMPORTANT]
> **Propiedades Vendidas y Reservadas:** Por defecto, los CRM suelen exportar solo inmuebles disponibles en sus feeds de portales. Para que las propiedades vendidas/reservadas del CRM aparezcan en tiempo real en la web, debes entrar a tu panel de **Inmovilla > Pasarelas/Portales** y activar la opción de **"Exportar propiedades vendidas y reservadas"** en este feed específico.
> Mientras no haya inmuebles vendidos/reservados en el XML, el sitio utilizará automáticamente un listado estético de respaldo (`src/data/fallbackProperties.ts`) para que la sección de la web permanezca completa e interactiva.

---

## 📝 Flujo de Trabajo para WordPress (Elementor)

Para actualizar o sincronizar el contenido y diseño en el sitio de WordPress corporativo, utilizamos los scripts de automatización en Python:

1. **Generar las Secciones en HTML:**
   Si realizas cambios en los componentes visuales de React y quieres llevarlos a WordPress, ejecuta el script de exportación:
   ```bash
   python3 export_remaining_wp.py
   python3 generate-faq.py
   ```
   Estos scripts leerán las definiciones de estilos y componentes y regenerarán los archivos dentro de la carpeta `wp-sections/`.
2. **Copiar a Elementor:**
   * Abre tu panel de administración de WordPress.
   * Edita la página deseada con **Elementor**.
   * Añade un widget de tipo **HTML**.
   * Abre el archivo de la sección correspondiente en `wp-sections/` (ej: `seccion-casos-exito-resenas.html`), copia todo su contenido de texto y pégalo en el widget HTML de Elementor. Guardar y listo.

---

## 📈 SEO y Marcado Estructurado de Google

Para maximizar la visibilidad en Google Maps y búsquedas locales de la comarca de Gandía, el proyecto cuenta con un marcado estructurado JSON-LD muy completo de tipo `RealEstateAgent`:
* **React:** El componente `components/SchemaMarkup.tsx` lo inyecta dinámicamente en el `<head>`.
* **WordPress:** Puedes copiar el código de [schema-realestateagent-wpcode.html](file:///Users/destebanrl/Downloads/essencia-inmobiliaria/wp-sections/schema-realestateagent-wpcode.html) e inyectarlo globalmente en el footer/header de WordPress mediante plugins como *Code Snippets* o *Insert Headers and Footers*.
* **Datos validados:** Incluye la calificación oficial de Google (**4.6 estrellas y 349 reseñas**), la dirección oficial (`Carrer Sant Vicent Ferrer, 24, 46702 Gandía, Valencia`), métodos de pago aceptados, monedas e información de áreas de servicio locales.
