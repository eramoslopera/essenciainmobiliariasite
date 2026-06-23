import os
import re

def update_asesores():
    path = "wp-sections/seccion-asesores.html"
    with open(path, "r") as f:
        content = f.read()
    
    # 1. Badge & labels font size
    content = content.replace("font-size:10px!important", "font-size:12px!important")
    content = content.replace("font-size:8.5px!important", "font-size:12px!important")
    
    # 2. Header span 'con tu asesor'
    content = content.replace("color:#d1d5db!important", "color:#1fc0d9!important")
    
    # 3. Hours text gray-400 -> gray-600
    content = content.replace("color:#9ca3af!important", "color:#4b5563!important")
    
    # 4. Featured specialty gray-500 -> gray-700
    content = content.replace("color:#6b7280!important", "color:#374151!important")
    
    with open(path, "w") as f:
        f.write(content)
        
def update_mia():
    path = "wp-sections/seccion-metodo-mia.html"
    with open(path, "r") as f:
        content = f.read()
        
    content = content.replace("font-size: 10px;", "font-size: 12px;")
    content = content.replace("color: #6B7280;", "color: #1f2937;")
    
    # Replace the 9px with 10px and font-weight 900
    content = re.sub(r'font-size:\s*9px;', 'font-size: 10px;\n  font-weight: 900;', content)
    
    with open(path, "w") as f:
        f.write(content)
        
def generate_hero():
    html = """<!-- ============================================================
     SECCIÓN HERO — Essencia Inmobiliaria
     Pegar en: WordPress > Elementor > HTML Widget
     ============================================================ -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800;900&display=swap">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
<style>
.ei-hero * { box-sizing: border-box; margin: 0; padding: 0; }
.ei-hero {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 5rem;
  overflow: hidden;
  font-family: 'Manrope', sans-serif;
}
.ei-hero-slides {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.ei-hero-slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  z-index: 0;
}
.ei-hero-slide.active {
  opacity: 1;
}
.ei-hero-bg {
  width: 100%;
  height: 100%;
  background-size: cover;
  transition: transform 8s linear;
  transform: scale(1);
}
.ei-hero-slide.active .ei-hero-bg {
  transform: scale(1.1);
}

.ei-hero-overlay1 { position: absolute; inset: 0; z-index: 1; background: rgba(255,255,255,0.4); }
.ei-hero-overlay2 { position: absolute; inset: 0; z-index: 1; background: linear-gradient(to top, rgba(255,255,255,0.6), rgba(255,255,255,0.4), transparent); }
.ei-hero-content {
  position: relative;
  z-index: 2;
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ei-hero-badge {
  display: inline-block;
  padding: 0.25rem 1.25rem;
  margin-bottom: 2rem;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(12px);
  color: #222222;
  border: 1px solid rgba(255,255,255,0.4);
  border-radius: 9999px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.05);
}
.ei-hero-title {
  font-size: clamp(3rem, 6vw, 6rem);
  font-weight: 900;
  color: #222222;
  margin-bottom: 1.5rem;
  line-height: 0.95;
  letter-spacing: -0.03em;
  drop-shadow: 0 1px 2px rgba(0,0,0,0.05);
}
.ei-hero-title span { color: #22d3ee; font-weight: 800; }
.ei-hero-subtitle {
  font-size: clamp(1.125rem, 2vw, 1.25rem);
  color: #111827; 
  max-width: 42rem;
  margin-bottom: 3rem;
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: -0.01em;
}
.ei-hero-buttons {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  justify-content: center;
  align-items: center;
  width: 100%;
}
@media (min-width: 640px) {
  .ei-hero-buttons {
    flex-direction: row;
  }
}
.ei-hero-btn {
  height: 3.5rem !important;
  padding: 0 2.5rem !important;
  border-radius: 9999px !important;
  font-size: 11px !important;
  font-weight: 900 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.2em !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 0.5rem !important;
  text-decoration: none !important;
  transition: all 0.3s ease !important;
  cursor: pointer !important;
  border: none !important;
  font-family: 'Manrope', sans-serif !important;
  white-space: nowrap !important;
}
.ei-btn-dark {
  background-color: #222222 !important;
  color: #ffffff !important;
  box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.05) !important;
}
.ei-btn-dark:hover { 
  transform: translateY(-0.25rem) !important; 
  box-shadow: 0 30px 60px -10px rgba(0, 0, 0, 0.1) !important; 
  background-color: #222222 !important;
  color: #ffffff !important;
}
.ei-btn-dark:active {
  transform: translateY(0) scale(0.98) !important;
}
.ei-btn-light {
  background-color: rgba(255,255,255,0.7) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  color: #222222 !important;
  border: 1px solid rgba(255,255,255,0.5) !important;
  box-shadow: none !important;
}
.ei-btn-light:hover { 
  background-color: #ffffff !important; 
  border-color: #ffffff !important; 
  transform: translateY(-0.25rem) !important; 
  box-shadow: 0 30px 60px -10px rgba(0, 0, 0, 0.1) !important; 
  color: #222222 !important;
}
.ei-btn-light:active {
  transform: translateY(0) scale(0.98) !important;
}
.ei-btn-light svg {
  transition: transform 0.3s ease !important;
}
.ei-btn-light:hover svg {
  transform: translateX(0.25rem) !important;
}
.ei-hero-dots {
  display: flex;
  gap: 1rem;
  margin-top: 4rem;
  z-index: 2;
}
.ei-hero-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #d1d5db;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.5s ease;
}
.ei-hero-dot:hover {
  background: #9ca3af;
}
.ei-hero-dot.active {
  background: #222222;
  transform: scale(1.5);
}
</style>

<div class="ei-hero">
  <div class="ei-hero-slides" id="ei-hero-slides">
    <div class="ei-hero-slide active">
      <div class="ei-hero-bg" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuD6CVDb-uj3cAC0Ob6Xoldojbr8fXAlqgRkajY38_fEYtheLsJfhvgNqCXQoidNSph5pxxTIA4A-xhr-pY90ZuV6kh2DC_7KoE4yBIYtDccfKzP1CcdpXDsNXLOROI7cvlTEDUDGK7e7POqLad-y3lLKyfffcbEcwqN9yGejMHM5xKcKUdYutySJ4gKxwHil_TPn5cms3boBRB4bDas5vt7CzfzSedfRnX3LOZiliuJrw2B0gk4vAdiAgkIfndu1DmSEjAfvSQw'); background-position: center;"></div>
    </div>
    <div class="ei-hero-slide">
      <div class="ei-hero-bg" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDSY-PXU4Aos5QXaijac90faiHIS204YriutHKAaYujVG4SZWwVd-HQk8IKShLRCD2mrH-OIVWer2XgAErCzUC_oChNo4RnkugwMaJ3Y-zSOq4-4jfCFa4ISvMZbRaPTdOFCUDu2OiWp1iS4ocb6Hoi5XneGiWUooX_Q_oi2cHRd5pjRF8ffN10TAKH57NDYH0CIdA-DNBnj73Sz9ReE_PJrBw6i0hkrS7KR1gsgila22DVBrYFBJwsrMLzBagtmE9zU1ZrYHK8'); background-position: center 30%;"></div>
    </div>
    <div class="ei-hero-slide">
      <div class="ei-hero-bg" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBTz0ljfPf17SA1GJ6uA8AFFp69r4QCIx9qAKheWPLsqb3SR9EiRThZW2pQrqT8Xq0ZMQkBXl7TkM-iW4Lv75dvy8PdbK9O30nJ35aX4fCg0S2feJ6JRYQQUGVRE_VdRjOjItcvyPHOCtbhJGoZS93wph_XgdsTjs-JRfjRxvz_Higm4ZVlH2KwIft4FCcypZ5tuZEmBATyNa2qENR5ZQOIjoGYF2i9mkiBN3wOiCJV8sOAVou3Y3J1JWjUk8qVNOGMTPeMEmtA'); background-position: center 60%;"></div>
    </div>
  </div>
  
  <div class="ei-hero-overlay1"></div>
  <div class="ei-hero-overlay2"></div>
  <div class="ei-hero-content">
    <span class="ei-hero-badge">Gandía y Valencia</span>
    <h1 class="ei-hero-title">Vendemos tu casa<br><span>En 45 Días.</span></h1>
    <p class="ei-hero-subtitle">No solo listamos casas; diseñamos ventas. Tiempo medio de venta de 45 días para propiedades en Gandía y Valencia.</p>
    <div class="ei-hero-buttons">
      <a href="https://wa.me/34647803355?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20vuestros%20servicios%20inmobiliarios" class="ei-hero-btn ei-btn-dark" target="_blank" rel="noopener noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm54.42,143.08a11.23,11.23,0,0,1-15.54,4.42,50.7,50.7,0,0,1-23-22.37,50.7,50.7,0,0,1-22.37-23,11.23,11.23,0,0,1,4.42-15.54l14.49-11.19a3.73,3.73,0,0,0,.61-3.62L119.06,66.41a9,9,0,0,0-15-2l-10-5.11a10,10,0,0,0-6.17,4c-12,16-11.23,37.38,2.44,55.61C102.34,143.07,123,161,148,168.69A45,45,0,0,0,161.51,170c14.61,0,27.24-8.8,32.32-22.18A10,10,0,0,0,191.84,141l-22-29.35a9,9,0,0,0-15-2l-14.49,11.19a3.73,3.73,0,0,0-3.62.61A57.5,57.5,0,0,0,111.24,129a3.73,3.73,0,0,0-.61,3.62L123,110.94a9,9,0,0,1,15,2Z"></path></svg>
        Consulta gratuita
      </a>
      <a href="https://essenciainmobiliarialandingpage.vercel.app/" class="ei-hero-btn ei-btn-light" target="_blank" rel="noopener noreferrer">
        Vende con nosotros
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path></svg>
      </a>
    </div>
    
    <div class="ei-hero-dots" id="ei-hero-dots">
      <button class="ei-hero-dot active" aria-label="Ir a imagen 1"></button>
      <button class="ei-hero-dot" aria-label="Ir a imagen 2"></button>
      <button class="ei-hero-dot" aria-label="Ir a imagen 3"></button>
    </div>
  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('#ei-hero-slides .ei-hero-slide');
    const dots = document.querySelectorAll('#ei-hero-dots .ei-hero-dot');
    let currentIndex = 0;
    
    function showSlide(index) {
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      currentIndex = index;
    }
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => showSlide(index));
    });
    
    setInterval(() => {
      let nextIndex = (currentIndex + 1) % slides.length;
      showSlide(nextIndex);
    }, 5000);
function generate_contact() {
    html = """<!-- ============================================================
     SECCIÓN CONTACTO — Essencia Inmobiliaria
     Pegar en: WordPress > Elementor > HTML Widget
     ============================================================ -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800;900&display=swap">
<style>
.ei-contact-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
.ei-contact-wrap {
  font-family: 'Manrope', sans-serif;
  background-color: #fff;
  position: relative;
  overflow: hidden;
  padding: 6rem 1.5rem;
}
.ei-contact-bg {
  position: absolute;
  right: 0;
  top: 0;
  width: 50%;
  height: 100%;
  opacity: 0.05;
  pointer-events: none;
  background: radial-gradient(ellipse at 80% 50%, #2563eb 0%, transparent 70%);
}
.ei-contact-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 5rem;
  align-items: start;
}
@media(max-width: 1024px) {
  .ei-contact-inner {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }
  .ei-contact-wrap {
    padding: 4rem 1.5rem;
  }
}
.ei-profile-col {
  display: flex;
  flex-direction: column;
}
.ei-profile-img-wrap {
  width: 100%;
  aspect-ratio: 1.452; /* Proporción 1024x705 */
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 48px -12px rgba(31,192,217,0.15);
  border: 1px solid rgba(31,192,217,0.15);
  margin-bottom: 2.25rem;
  background: #f3f4f6;
}
.ei-profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 22%;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  display: block;
}
.ei-profile-img-wrap:hover .ei-profile-img {
  transform: scale(1.04);
}
.ei-profile-title {
  font-size: clamp(1.65rem, 3vw, 2.25rem);
  font-weight: 800;
  color: #111827;
  line-height: 1.3;
  margin-bottom: 2rem;
  letter-spacing: -0.025em;
}
.ei-profile-title strong {
  font-weight: 900;
}
.ei-profile-title span {
  color: #1fc0d9;
}
.ei-contact-legal {
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 1.5rem;
  font-size: 11px;
  color: #4b5563;
  line-height: 1.6;
}
.ei-contact-legal h5 {
  font-size: 11px;
  font-weight: 800;
  color: #111827;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.5rem;
}
.ei-contact-legal p {
  margin-bottom: 0.5rem;
}
.ei-contact-legal p:last-child {
  margin-bottom: 0;
}
.ei-contact-legal strong {
  color: #1f2937;
}
.ei-contact-legal a {
  color: #1fc0d9;
  text-decoration: underline;
  font-weight: 700;
}

.ei-form-col {
  position: relative;
  z-index: 2;
}
.ei-form-box {
  background: #fff;
  border: 1px solid #f3f4f6;
  box-shadow: 0 20px 50px rgba(31,192,217,0.08);
  border-radius: 28px;
  padding: 2.75rem 2.25rem;
}
@media(max-width: 640px) {
  .ei-form-box {
    padding: 2rem 1.5rem;
  }
}
.ei-form-group {
  margin-bottom: 1.5rem;
}
.ei-form-label {
  display: block;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #374151;
  margin-bottom: 0.5rem;
}
.ei-form-input {
  width: 100%;
  border: none;
  border-bottom: 1px solid #e5e7eb;
  padding: 0.75rem 0;
  font-size: 0.95rem;
  color: #111827;
  background: transparent;
  font-family: inherit;
  transition: border-bottom-color 0.2s ease;
}
.ei-form-input::placeholder {
  color: #9ca3af;
}
.ei-form-input:focus {
  outline: none;
  border-bottom-color: #1fc0d9;
}
.ei-form-consent {
  margin: 1.75rem 0;
}
.ei-consent-label {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 12px;
  color: #4b5563;
  cursor: pointer;
  line-height: 1.4;
}
.ei-consent-label input {
  margin-top: 3px;
  cursor: pointer;
  accent-color: #1fc0d9;
}
.ei-consent-label a {
  color: #1fc0d9;
  text-decoration: underline;
  font-weight: 600;
}
.ei-form-submit {
  width: 100%;
  height: 3.5rem;
  border-radius: 9999px;
  background: #111827;
  color: #fff;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 11px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px rgba(31,192,217,0.2);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.ei-form-submit:hover {
  background: #000;
  transform: translateY(-2px);
  box-shadow: 0 15px 30px rgba(31,192,217,0.3);
}
.ei-form-submit:active {
  transform: translateY(0) scale(0.98);
}
</style>

<div class="ei-contact-wrap" id="contacto">
  <div class="ei-contact-bg"></div>
  <div class="ei-contact-inner">
    
    <!-- Columna Izquierda: Foto de Carolina, Título y Privacidad (GDPR) -->
    <div class="ei-profile-col">
      <div class="ei-profile-img-wrap">
        <img class="ei-profile-img" data-real-src="https://essenciainmobiliaria.com/wp-content/uploads/2021/04/Captura-de-pantalla-2021-04-23-a-las-23.43.04-e1619469684318-1024x705.jpg" alt="Carolina González — Essencia Inmobiliaria" />
      </div>
      <h2 class="ei-profile-title">
        <strong>Hola, soy Carolina González,</strong><br><span>contacta a través del siguiente formulario</span>
      </h2>
      
      <!-- Primera Capa de Protección de Datos (GDPR) -->
      <div class="ei-contact-legal">
        <h5>Información básica sobre protección de datos</h5>
        <p><strong>Responsable del tratamiento:</strong> VIVIENDAS DE LA SAFOR SL</p>
        <p><strong>Dirección del responsable:</strong> Calle Sant Vicent Ferrer 24, CP 46702, GANDIA (Valencia/València)</p>
        <p><strong>Finalidad:</strong> Sus datos serán usados para poder atender sus solicitudes y prestarle nuestros servicios.</p>
        <p><strong>Publicidad:</strong> Solo le enviaremos publicidad con su autorización previa, que podrá facilitarnos mediante la casilla correspondiente establecida al efecto.</p>
        <p><strong>Legitimación:</strong> Únicamente trataremos sus datos con su consentimiento previo, que podrá facilitarnos mediante la casilla correspondiente establecida al efecto.</p>
        <p><strong>Destinatarios:</strong> Con carácter general, sólo el personal de nuestra entidad que esté debidamente autorizado podrá tener conocimiento de la información que le pedimos.</p>
        <p><strong>Derechos:</strong> Tiene derecho a saber qué información tenemos sobre usted, corregirla y eliminarla, tal y como se explica en la información adicional disponible en nuestra página web.</p>
        <p><strong>Información adicional:</strong> Más información en el apartado “<a href="https://essenciainmobiliaria.com/privacy" target="_blank">POLÍTICA DE PRIVACIDAD</a>” de nuestra página web.</p>
      </div>
    </div>
    
    <!-- Columna Derecha: Formulario de Contacto -->
    <div class="ei-form-col">
      <div class="ei-form-box">
        <form action="https://formsubmit.co/santitorres@essenciainmobiliaria.com" method="POST">
          <input type="hidden" name="_next" value="https://essenciainmobiliaria.com">
          <input type="hidden" name="_subject" value="Nuevo Lead desde Landing Page">
          
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem;">
            <div class="ei-form-group">
              <label class="ei-form-label">Nombre</label>
              <input type="text" name="name" class="ei-form-input" placeholder="María García" required>
            </div>
            <div class="ei-form-group">
              <label class="ei-form-label">Teléfono</label>
              <input type="tel" name="phone" class="ei-form-input" placeholder="+34 600 000 000" required>
            </div>
          </div>
          <div class="ei-form-group">
            <label class="ei-form-label">Email</label>
            <input type="email" name="email" class="ei-form-input" placeholder="maria@example.com" required>
          </div>
          <div class="ei-form-group">
            <label class="ei-form-label">Motivo</label>
            <select name="reason" class="ei-form-input" required style="background:transparent; appearance:none;">
              <option value="Comprar">Comprar propiedad</option>
              <option value="Vender">Vender propiedad</option>
              <option value="Valoración">Valoración gratuita</option>
              <option value="Invertir">Invertir</option>
            </select>
          </div>
          <div class="ei-form-group">
            <label class="ei-form-label">Mensaje</label>
            <textarea name="message" class="ei-form-input" placeholder="¿En qué te podemos ayudar?" rows="3"></textarea>
          </div>
          
          <!-- Consentimiento checkbox obligatorio -->
          <div class="ei-form-consent">
            <label class="ei-consent-label">
              <input type="checkbox" name="privacy_consent" required>
              <span>Acepto la <a href="https://essenciainmobiliaria.com/privacy" target="_blank">política de privacidad</a> y el tratamiento de mis datos.</span>
            </label>
          </div>
          
          <button type="submit" class="ei-form-submit">PIDE TU CITA</button>
        </form>
      </div>
    </div>
    
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
  // Evitar que Houzez bloquee la carga de la imagen
  requestAnimationFrame(() => {
    const img = document.querySelector('img[data-real-src]');
    if (img) {
      const realSrc = img.getAttribute('data-real-src');
      img.removeAttribute('data-src');
      img.classList.remove('houzez-lazyload');
      img.src = realSrc;
    }
  });

  const form = document.querySelector('.ei-form-box form');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault(); // Pause submission to save to Supabase
      
      const btn = form.querySelector('.ei-form-submit');
      const originalText = btn.textContent;
      btn.textContent = 'Enviando...';
      btn.disabled = true;

      const fd = new FormData(form);
      const payload = {
        first_name: fd.get('name') || '',
        email: fd.get('email') || '',
        phone: fd.get('phone') || null,
        interest: fd.get('reason') || null,
        message: fd.get('message') || null,
        source: 'wp_contact_form'
      };

      try {
        const supabaseUrl = 'https://kynhkfrxdzzghaamtyjc.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5bmhrZnJ4ZHp6Z2hhYW10eWpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNTI2MjcsImV4cCI6MjA5MDYyODYyN30.VKtjUxQS1CqcHs59bKoOX_8gQ0pJgdpHE9xqf6pl49o';
        const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
        
        await supabaseClient.from('contacts').insert([payload]);
      } catch (err) {
        console.warn('[Essencia] Error guardando lead en Supabase', err);
      }
      
      // Submit form programmatically bypassing the event listener
      HTMLFormElement.prototype.submit.call(form);
    });
  }
});
</script>
"""
    with open("wp-sections/seccion-formulario-contacto.html", "w") as f:
     Pegar en: WordPress > Elementor > HTML Widget
     ============================================================ -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800;900&display=swap">
<style>
.ei-stats-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
.ei-stats-wrap {
  font-family: 'Manrope', sans-serif;
  background-color: #222222;
  color: #ffffff;
  position: relative;
  overflow: hidden;
  padding: 6rem 1.5rem;
}
.ei-stats-glow1 {
  position: absolute;
  top: 0; right: 0;
  width: 600px; height: 600px;
  background: rgba(31,192,217,0.1);
  filter: blur(140px);
  border-radius: 50%;
  pointer-events: none;
}
.ei-stats-glow2 {
  position: absolute;
  bottom: 0; left: 0;
  width: 400px; height: 400px;
  background: rgba(31,192,217,0.05);
  filter: blur(100px);
  border-radius: 50%;
  pointer-events: none;
}
.ei-stats-inner {
  max-width: 1440px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  align-items: center;
}
@media(max-width: 1024px) {
  .ei-stats-inner { grid-template-columns: 1fr; gap: 3rem; }
}
/* Left Col */
.ei-stats-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}
.ei-stats-badge-line {
  width: 2rem;
  height: 1px;
  background: #4edcf1;
}
.ei-stats-badge-text {
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #4edcf1;
}
.ei-stats-title {
  font-size: clamp(3rem, 5vw, 3.75rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.05em;
  margin-bottom: 2rem;
  color: #ffffff;
}
.ei-stats-title span { color: rgba(255,255,255,0.6); }
.ei-stats-desc {
  color: #e5e7eb;
  font-size: 1rem;
  line-height: 1.6;
  font-weight: 500;
  max-width: 24rem;
}
.ei-stats-divider {
  margin-top: 3rem;
  padding-top: 3rem;
  border-top: 1px solid rgba(255,255,255,0.1);
}
.ei-stats-divider p {
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #9ca3af;
}
/* Right Col Grid */
.ei-stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 1rem;
  overflow: hidden;
}
@media(max-width: 640px) {
  .ei-stats-grid { grid-template-columns: 1fr; }
}
.ei-stat-item {
  background: #222222;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}
.ei-stat-hover {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: #22d3ee;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s ease;
}
.ei-stat-item:hover .ei-stat-hover { transform: scaleX(1); }
.ei-stat-value {
  font-size: clamp(2.25rem, 4vw, 3.75rem);
  font-weight: 900;
  letter-spacing: -0.05em;
  color: #ffffff;
  line-height: 1;
  margin-bottom: 1rem;
  font-variant-numeric: tabular-nums;
}
.ei-stat-label {
  font-size: 0.875rem;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: -0.025em;
  margin-bottom: 0.25rem;
}
.ei-stat-note {
  font-size: 0.75rem;
  color: #d1d5db;
  font-weight: 500;
  line-height: 1.4;
}
</style>

<div class="ei-stats-wrap">
  <div class="ei-stats-glow1"></div>
  <div class="ei-stats-glow2"></div>
  <div class="ei-stats-inner">
    
    <div>
      <div class="ei-stats-badge">
        <div class="ei-stats-badge-line"></div>
        <span class="ei-stats-badge-text">Datos reales · 2025</span>
      </div>
      <h2 class="ei-stats-title">Números<br><span>que hablan.</span></h2>
      <p class="ei-stats-desc">Más de 15 años vendiendo propiedades en Gandía y La Safor. Estos son los resultados de Essencia Inmobiliaria.</p>
      <div class="ei-stats-divider">
        <p>Essencia Inmobiliaria · Gandía, La Safor</p>
      </div>
    </div>

    <div class="ei-stats-grid">
      <div class="ei-stat-item">
        <div class="ei-stat-hover"></div>
        <div class="ei-stat-value" data-val="2000" data-prefix="+" data-suffix="">+2000</div>
        <div>
          <p class="ei-stat-label">Ventas cerradas</p>
          <p class="ei-stat-note">15 años en el mercado de Gandía</p>
        </div>
      </div>
      
      <div class="ei-stat-item">
        <div class="ei-stat-hover"></div>
        <div class="ei-stat-value" data-val="45" data-prefix="" data-suffix=" días">45 días</div>
        <div>
          <p class="ei-stat-label">Media hasta la venta</p>
          <p class="ei-stat-note">Desde la captación hasta escrituras</p>
        </div>
      </div>

      <div class="ei-stat-item">
        <div class="ei-stat-hover"></div>
        <div class="ei-stat-value" data-val="13" data-prefix="" data-suffix="M€">13M€</div>
        <div>
          <p class="ei-stat-label">En ventas este año</p>
          <p class="ei-stat-note">Volumen de operaciones en 2025</p>
        </div>
      </div>

      <div class="ei-stat-item">
        <div class="ei-stat-hover"></div>
        <div class="ei-stat-value" data-val="95" data-prefix="" data-suffix="%">95%</div>
        <div>
          <p class="ei-stat-label">Clientes satisfechos</p>
          <p class="ei-stat-note">Según encuesta post-venta</p>
        </div>
      </div>
    </div>
    
  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const formatNumber = (num) => Math.floor(num).toLocaleString('es-ES');
    
    const elements = document.querySelectorAll('.ei-stat-value');
    
    const animateValue = (el) => {
      if (el.classList.contains('animated')) return;
      el.classList.add('animated');
      
      const target = parseFloat(el.getAttribute('data-val'));
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';
      
      const duration = 2000;
      const start = performance.now();
      
      const update = (time) => {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // easeOutQuart
        const ease = 1 - Math.pow(1 - progress, 4);
        
        const current = target * ease;
        el.textContent = prefix + formatNumber(current) + suffix;
        
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = prefix + formatNumber(target) + suffix;
        }
      };
      
      requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateValue(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    elements.forEach(el => observer.observe(el));
  });
</script>
"""
    with open("wp-sections/seccion-estadisticas.html", "w") as f:
        f.write(html)

if __name__ == "__main__":
    update_asesores()
    update_mia()
    generate_hero()
    generate_stats()
    generate_contact()
    
    # Sincronizar todos los archivos de wp-sections/ a public/wp-sections/
    import shutil
    src_dir = "wp-sections"
    dst_dir = "public/wp-sections"
    if os.path.exists(src_dir):
        os.makedirs(dst_dir, exist_ok=True)
        for item in os.listdir(src_dir):
            s = os.path.join(src_dir, item)
            d = os.path.join(dst_dir, item)
            if os.path.isfile(s):
                shutil.copy2(s, d)
    print("All WP HTML sections generated, updated and synced to public/wp-sections.")
