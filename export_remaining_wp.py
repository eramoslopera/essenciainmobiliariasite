import os
import re

def save_html_section(filename, content):
    # Escribir en wp-sections/
    path1 = os.path.join("wp-sections", filename)
    with open(path1, "w") as f:
        f.write(content)
    # Escribir en public/wp-sections/ si existe el directorio
    path2 = os.path.join("public", "wp-sections", filename)
    if os.path.exists(os.path.dirname(path2)):
        with open(path2, "w") as f:
            f.write(content)

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
  });
</script>
"""
    save_html_section("seccion-hero.html", html)

def generate_contact():
    html = """<!-- ============================================================
     SECCIÓN CONTACTO — Essencia Inmobiliaria
     Pegar en: WordPress > Elementor > HTML Widget
     ============================================================ -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800;900&display=swap">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
<style>
.ei-contact-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
.ei-contact-wrap {
  font-family: 'Manrope', sans-serif;
  background-color: #fff;
  position: relative;
  overflow: hidden;
  padding: 6rem 1.5rem;
  border-top: 1px solid #f3f4f6;
}
.ei-contact-bg {
  position: absolute;
  right: 0;
  top: 0;
  width: 50%;
  height: 100%;
  opacity: 0.05;
  pointer-events: none;
  background: radial-gradient(ellipse at 80% 50%, #1fc0d9 0%, transparent 70%);
}
.ei-contact-inner {
  max-width: 1240px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 5rem;
  align-items: start;
}
@media(max-width: 1024px) { 
  .ei-contact-inner { 
    grid-template-columns: 1fr; 
    gap: 4rem;
  } 
}
.ei-ct-badge { 
  color: #1fc0d9; 
  font-weight: 700; 
  letter-spacing: 0.1em; 
  text-transform: uppercase; 
  font-size: 0.75rem; 
  margin-bottom: 1.5rem; 
  display: block; 
}
.ei-profile-card {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 2rem;
}
@media(max-width: 640px) {
  .ei-profile-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
.ei-profile-img {
  width: 7rem;
  height: 7rem;
  border-radius: 2rem;
  object-fit: cover;
  object-position: top;
  border: 1px solid #f3f4f6;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  flex-shrink: 0;
}
@media(min-width: 768px) {
  .ei-profile-img {
    width: 8rem;
    height: 8rem;
  }
}
.ei-profile-info h3 {
  font-size: 1.5rem;
  font-weight: 900;
  color: #111827;
  letter-spacing: -0.02em;
  margin: 0;
}
.ei-profile-role {
  display: inline-block;
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #1fc0d9;
  margin-top: 0.375rem;
}
.ei-profile-meta {
  font-size: 11px;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 0.5rem;
  font-weight: 600;
}
.ei-ct-message {
  color: #374151;
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}
.ei-ct-message strong {
  font-weight: 700;
}
.ei-ct-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2.5rem;
}
@media(max-width: 640px) {
  .ei-ct-buttons {
    justify-content: center;
  }
}
.ei-ct-btn-cite {
  height: 3rem;
  padding: 0 2rem;
  background-color: #111827;
  color: #ffffff !important;
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}
.ei-ct-btn-cite:hover {
  background-color: #1f2937;
  transform: translateY(-1px);
}
.ei-ct-btn-cite:active {
  transform: translateY(0);
}
.ei-ct-btn-wa {
  height: 3rem;
  padding: 0 2rem;
  background-color: transparent;
  color: #111827 !important;
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  border-radius: 9999px;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
}
.ei-ct-btn-wa:hover {
  border-color: #111827;
  background-color: #f9fafb;
  transform: translateY(-1px);
}
.ei-ct-btn-wa:active {
  transform: translateY(0);
}

/* GDPR Accordion */
.ei-rgpd-accordion {
  border: 1px solid #f3f4f6;
  border-radius: 1rem;
  padding: 1.25rem;
  background-color: rgba(248, 250, 252, 0.6);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}
.ei-rgpd-trigger {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  border: none;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #374151;
  cursor: pointer;
  padding: 0;
  text-align: left;
}
.ei-rgpd-trigger:focus {
  outline: none;
}
.ei-rgpd-icon {
  font-size: 18px;
  transition: transform 0.3s ease;
  user-select: none;
}
.ei-rgpd-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out, margin-top 0.3s ease, padding-top 0.3s ease;
}
.ei-rgpd-accordion.open .ei-rgpd-content {
  max-height: 500px;
  margin-top: 1.25rem;
  border-top: 1px solid rgba(229, 231, 235, 0.5);
  padding-top: 1.25rem;
}
.ei-rgpd-accordion.open .ei-rgpd-icon {
  transform: rotate(180deg);
}
.ei-rgpd-info-item {
  margin-bottom: 0.75rem;
  font-size: 11px;
  color: #4b5563;
  line-height: 1.5;
}
.ei-rgpd-info-item:last-child {
  margin-bottom: 0;
}
.ei-rgpd-info-item strong {
  font-weight: 700;
  color: #374151;
}

/* Form Styling */
.ei-form-box { 
  background: #fff; 
  border: 1px solid #f3f4f6; 
  box-shadow: 0 20px 40px rgba(31,192,217,0.06); 
  border-radius: 1.5rem; 
  padding: 2.5rem; 
  position: relative; 
  z-index: 2; 
}
@media(max-width: 640px) {
  .ei-form-box {
    padding: 1.5rem;
  }
}
.ei-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}
@media(max-width: 640px) {
  .ei-form-grid {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
.ei-form-group { 
  margin-bottom: 1.5rem; 
}
.ei-form-label { 
  display: block; 
  font-size: 0.75rem; 
  font-weight: 700; 
  text-transform: uppercase; 
  letter-spacing: 0.1em; 
  color: #4b5563; 
  margin-bottom: 0.25rem; 
}
.ei-form-input { 
  width: 100%; 
  border: none; 
  border-bottom: 1px solid #e5e7eb; 
  padding: 0.75rem 0; 
  font-size: 0.875rem; 
  color: #111827; 
  background: transparent; 
  font-family: inherit; 
  border-radius: 0;
  transition: border-bottom-color 0.2s ease;
}
.ei-form-input:focus { 
  outline: none; 
  border-bottom-color: #111827; 
}
.ei-form-input::placeholder { 
  color: #9ca3af; 
}
.ei-form-submit { 
  width: 100%; 
  padding: 1.25rem; 
  border-radius: 9999px; 
  background: #111827; 
  color: #fff; 
  font-weight: 700; 
  text-transform: uppercase; 
  letter-spacing: 0.2em; 
  font-size: 10px; 
  border: none; 
  cursor: pointer; 
  margin-top: 1rem; 
  transition: all 0.3s ease; 
  box-shadow: 0 10px 25px rgba(0,0,0,0.05); 
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
.ei-form-submit:hover { 
  background: #000; 
  transform: translateY(-2px); 
  box-shadow: 0 15px 30px rgba(0,0,0,0.1); 
}
.ei-form-submit:active {
  transform: translateY(0);
}
.ei-form-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.ei-form-privacy { 
  font-size: 11px; 
  color: #6b7280; 
  text-align: center; 
  margin-top: 1.25rem; 
}
</style>

<div class="ei-contact-wrap" id="contacto">
  <div class="ei-contact-bg"></div>
  <div class="ei-contact-inner">
    
    <!-- Left — Profile Card & GDPR Info -->
    <div>
      <span class="ei-ct-badge">Atención Personalizada</span>
      
      <!-- Profile Card -->
      <div class="ei-profile-card">
        <img
          src="https://essenciainmobiliariasite.vercel.app/carolina.jpg"
          alt="Carolina González - Asesora Inmobiliaria"
          class="ei-profile-img"
        />
        <div class="ei-profile-info">
          <h3>Carolina González</h3>
          <span class="ei-profile-role">Asesora Inmobiliaria & Marketing</span>
          <p class="ei-profile-meta">ZONA: GANDÍA & COSTA · IDIOMAS: ES, EN</p>
        </div>
      </div>

      <!-- Message block -->
      <p class="ei-ct-message">
        Hola, soy Carolina González. Estoy a tu disposición para diseñar la mejor estrategia de comercialización para tu propiedad con el <strong>Método MIA</strong>, o para ayudarte a encontrar el hogar ideal en Gandía y la costa de Valencia. Escríbeme directamente o solicita una cita.
      </p>

      <!-- Action Buttons -->
      <div class="ei-ct-buttons">
        <button
          id="ei-btn-cite-trigger"
          class="ei-ct-btn-cite"
        >
          Pide tu cita
        </button>
        
        <a
          href="https://wa.me/34647803355?text=Hola%20Carolina%2C%20me%20gustar%C3%ADa%20recibir%20asesoramiento%20inmobiliario"
          target="_blank"
          rel="noopener noreferrer"
          class="ei-ct-btn-wa"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#22c55e" viewBox="0 0 256 256" style="vertical-align: middle;"><path d="M128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm54.42,143.08a11.23,11.23,0,0,1-15.54,4.42,50.7,50.7,0,0,1-23-22.37,50.7,50.7,0,0,1-22.37-23,11.23,11.23,0,0,1,4.42-15.54l14.49-11.19a3.73,3.73,0,0,0,.61-3.62L119.06,66.41a9,9,0,0,0-15-2l-10-5.11a10,10,0,0,0-6.17,4c-12,16-11.23,37.38,2.44,55.61C102.34,143.07,123,161,148,168.69A45,45,0,0,0,161.51,170c14.61,0,27.24-8.8,32.32-22.18A10,10,0,0,0,191.84,141l-22-29.35a9,9,0,0,0-15-2l-14.49,11.19a3.73,3.73,0,0,0-3.62.61A57.5,57.5,0,0,0,111.24,129a3.73,3.73,0,0,0-.61,3.62L123,110.94a9,9,0,0,1,15,2Z"></path></svg>
          WhatsApp directo
        </a>
      </div>

      <!-- RGPD Accordion -->
      <div class="ei-rgpd-accordion" id="ei-rgpd-accordion">
        <button
          id="ei-rgpd-trigger"
          class="ei-rgpd-trigger"
          aria-expanded="false"
        >
          <span>Información básica sobre protección de datos</span>
          <span class="material-symbols-outlined ei-rgpd-icon">expand_more</span>
        </button>
        
        <div class="ei-rgpd-content">
          <div class="ei-rgpd-info-item"><strong>Responsable del tratamiento:</strong> VIVIENDAS DE LA SAFOR SL</div>
          <div class="ei-rgpd-info-item"><strong>Dirección del responsable:</strong> Calle Sant Vicent Ferrer 24, CP 46702, GANDIA (Valencia/València)</div>
          <div class="ei-rgpd-info-item"><strong>Finalidad:</strong> Sus datos serán usados para poder atender sus solicitudes y prestarle nuestros servicios.</div>
          <div class="ei-rgpd-info-item"><strong>Publicidad:</strong> Solo le enviaremos publicidad con su autorización previa, que podrá facilitarnos mediante la casilla correspondiente establecida al efecto.</div>
          <div class="ei-rgpd-info-item"><strong>Legitimación:</strong> Únicamente trataremos sus datos con su consentimiento previo, que podrá facilitarnos mediante la casilla correspondiente establecida al efecto.</div>
          <div class="ei-rgpd-info-item"><strong>Destinatarios:</strong> Con carácter general, solo el personal de nuestra entidad que esté debidamente autorizado podrá tener conocimiento de la información que le pedimos.</div>
          <div class="ei-rgpd-info-item"><strong>Derechos:</strong> Tiene derecho a saber qué información tenemos sobre usted, corregirla y eliminarla, tal y como se explica en la información adicional disponible en nuestra página web.</div>
          <div class="ei-rgpd-info-item"><strong>Información adicional:</strong> Más información en el apartado "POLÍTICA DE PRIVACIDAD" de nuestra página web.</div>
        </div>
      </div>
    </div>
    
    <!-- Right — Form Box -->
    <div class="ei-form-box">
      <form action="https://formsubmit.co/santitorres@essenciainmobiliaria.com" method="POST">
        <input type="hidden" name="_next" value="https://essenciainmobiliaria.com">
        <input type="hidden" name="_subject" value="Nuevo Lead desde Landing Page">
        
        <div class="ei-form-grid">
          <div class="ei-form-group">
            <label class="ei-form-label">Nombre</label>
            <input type="text" name="name" id="form-name-home_page" class="ei-form-input" placeholder="María García" required>
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
            <option value="buy">Comprar propiedad</option>
            <option value="sell">Vender propiedad</option>
            <option value="valuation">Valoración gratuita</option>
            <option value="invest">Invertir</option>
          </select>
        </div>
        <div class="ei-form-group">
          <label class="ei-form-label">Mensaje</label>
          <textarea name="message" class="ei-form-input" placeholder="¿En qué te podemos ayudar?" rows="3"></textarea>
        </div>
        <button type="submit" class="ei-form-submit">
          Enviar mensaje
          <span class="material-symbols-outlined" style="font-size: 14px;">arrow_forward</span>
        </button>
        <p class="ei-form-privacy">Tu información está protegida. Nunca compartimos tus datos.</p>
      </form>
    </div>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
  // Accordion Toggle
  const trigger = document.getElementById('ei-rgpd-trigger');
  const accordion = document.getElementById('ei-rgpd-accordion');
  if (trigger && accordion) {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      accordion.classList.toggle('open');
      const isOpen = accordion.classList.contains('open');
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      
      const content = accordion.querySelector('.ei-rgpd-content');
      if (isOpen) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = '0px';
      }
    });
  }

  // Scroll to Form Focus
  const citeBtn = document.getElementById('ei-btn-cite-trigger');
  const nameInput = document.getElementById('form-name-home_page');
  if (citeBtn && nameInput) {
    citeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      nameInput.focus();
    });
  }

  // Form Submit handler
  const form = document.querySelector('.ei-form-box form');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault(); // Pause submission to save to Supabase
      
      const btn = form.querySelector('.ei-form-submit');
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Enviando...';
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
    save_html_section("seccion-formulario-contacto.html", html)

def generate_stats():
    html = """<!-- ============================================================
     SECCIÓN ESTADÍSTICAS — Essencia Inmobiliaria
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
    save_html_section("seccion-estadisticas.html", html)

def generate_ai_portals():
    html = """<!-- ============================================================
     SECCIÓN EXPERTOS EN IA — Essencia Inmobiliaria
     Pegar en: WordPress > Elementor > HTML Widget
     ============================================================ -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800;900&display=swap">
<style>
.ei-ai-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
.ei-ai-wrap {
  background-color: #fff;
  padding: 5rem 1.5rem;
  overflow: hidden;
  border-top: 1px solid #f3f4f6;
  font-family: 'Manrope', sans-serif;
}
.ei-ai-inner {
  max-width: 1240px;
  margin: 0 auto;
  text-align: center;
}
.ei-ai-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  color: #111827;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 2rem;
  text-transform: uppercase;
}
.ei-ai-title span {
  color: #1fc0d9;
}
.ei-ai-desc {
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  color: #374151;
  font-weight: 600;
  line-height: 1.6;
  max-width: 56rem;
  margin: 0 auto 3rem auto;
}
.ei-ai-desc span {
  color: #1fc0d9;
  font-weight: 800;
}
.ei-ai-divider {
  width: 100%;
  height: 1px;
  background-color: #f3f4f6;
  margin-bottom: 3rem;
}
.ei-ai-logos {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
}
@media (min-width: 768px) {
  .ei-ai-logos {
    gap: 4rem;
  }
}
@media (min-width: 1024px) {
  .ei-ai-logos {
    gap: 5rem;
  }
}
.ei-ai-logo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: default;
}
.ei-ai-logo-item:hover {
  transform: scale(1.05);
}
.ei-ai-logo-img {
  width: auto !important;
  max-width: 100% !important;
  object-fit: contain;
  user-select: none;
  -webkit-user-drag: none;
}
/* Logo Heights & Max Widths */
.h-idealista {
  height: 44px !important;
  max-width: 180px !important;
}
.h-kyero {
  height: 40px !important;
  max-width: 140px !important;
}
.h-pisos {
  height: 40px !important;
  max-width: 160px !important;
}
.h-habitaclia {
  height: 40px !important;
  max-width: 160px !important;
}
.h-fotocasa {
  height: 96px !important;
  width: 96px !important;
  max-width: 96px !important;
}
.h-caixabank {
  height: 40px !important;
  max-width: 160px !important;
}

@media(min-width: 768px) {
  .h-idealista {
    height: 56px !important;
    max-width: 220px !important;
  }
  .h-kyero {
    height: 48px !important;
    max-width: 180px !important;
  }
  .h-pisos {
    height: 50px !important;
    max-width: 200px !important;
  }
  .h-habitaclia {
    height: 48px !important;
    max-width: 200px !important;
  }
  .h-fotocasa {
    height: 112px !important;
    width: 112px !important;
    max-width: 112px !important;
  }
  .h-caixabank {
    height: 48px !important;
    max-width: 200px !important;
  }
}
</style>

<section class="ei-ai-wrap">
  <div class="ei-ai-inner">
    <h2 class="ei-ai-title">EXPERTOS EN IA<br><span>(INTELIGENCIA ARTIFICIAL)</span></h2>
    <p class="ei-ai-desc"><span>ACELERA LA VENTA DE TU CASA X10.</span> Invertimos +4.000€ mensuales en marketing. Portales inmobiliarios, videollamadas, tours virtuales, planos, vídeos y hasta que el cliente pueda realizar la visita y la reserva desde el sillón de su casa.</p>
    <div class="ei-ai-divider"></div>
    <div class="ei-ai-logos">
      <div class="ei-ai-logo-item">
        <img src="https://essenciainmobiliariasite.vercel.app/logo-idealista.png" alt="idealista.com" class="ei-ai-logo-img h-idealista">
      </div>
      <div class="ei-ai-logo-item">
        <img src="https://essenciainmobiliariasite.vercel.app/logo-kyero.png" alt="kyero" class="ei-ai-logo-img h-kyero">
      </div>
      <div class="ei-ai-logo-item">
        <img src="https://essenciainmobiliariasite.vercel.app/logo-pisos.png" alt="pisos.com" class="ei-ai-logo-img h-pisos">
      </div>
      <div class="ei-ai-logo-item">
        <img src="https://essenciainmobiliariasite.vercel.app/logo-habitaclia.jpg" alt="habitaclia" class="ei-ai-logo-img h-habitaclia">
      </div>
      <div class="ei-ai-logo-item">
        <img src="https://essenciainmobiliariasite.vercel.app/logo-fotocasa.png" alt="Fotocasa Sello de Calidad" class="ei-ai-logo-img h-fotocasa">
      </div>
      <div class="ei-ai-logo-item">
        <img src="https://essenciainmobiliariasite.vercel.app/logo-caixabank.jpg" alt="CaixaBank FaciliteaCasa" class="ei-ai-logo-img h-caixabank">
      </div>
    </div>
  </div>
</section>
"""
    save_html_section("seccion-expertos-ia.html", html)

def generate_vender_hero():
    html = """<!-- ============================================================
     SECCIÓN HERO VENDER — Essencia Inmobiliaria
     Pegar en: WordPress > Elementor > HTML Widget
     ============================================================ -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800;900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
<style>
.eiv-hero * { box-sizing: border-box; margin: 0; padding: 0; }
.eiv-hero {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rem 0 5rem 0;
  overflow: hidden;
  font-family: 'Manrope', sans-serif;
  background-color: #ffffff;
}
.eiv-hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuD6CVDb-uj3cAC0Ob6Xoldojbr8fXAlqgRkajY38_fEYtheLsJfhvgNqCXQoidNSph5pxxTIA4A-xhr-pY90ZuV6kh2DC_7KoE4yBIYtDccfKzP1CcdpXDsNXLOROI7cvlTEDUDGK7e7POqLad-y3lLKyfffcbEcwqN9yGejMHM5xKcKUdYutySJ4gKxwHil_TPn5cms3boBRB4bDas5vt7CzfzSedfRnX3LOZiliuJrw2B0gk4vAdiAgkIfndu1DmSEjAfvSQw");
  background-size: cover;
  background-position: center;
  transform: scale(1.02);
}
.eiv-hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.98) 50%, rgba(255,255,255,0.4) 100%);
}
@media (max-width: 1023px) {
  .eiv-hero-overlay {
    background: linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0.98) 70%, rgba(255,255,255,0.8) 100%);
  }
}
.eiv-hero-container {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}
@media (min-width: 1024px) {
  .eiv-hero-container {
    grid-template-columns: 1.15fr 0.85fr;
    gap: 4rem;
  }
}
.eiv-hero-left {
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* Animaciones Staggered CSS para el Hero Left */
@keyframes slideUpFade {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
.eiv-hero-left > * {
  animation: slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
}
.eiv-hero-left > :nth-child(1) { animation-delay: 0.1s; }
.eiv-hero-left > :nth-child(2) { animation-delay: 0.22s; }
.eiv-hero-left > :nth-child(3) { animation-delay: 0.34s; }
.eiv-hero-left > :nth-child(4) { animation-delay: 0.46s; }
.eiv-hero-left > :nth-child(5) { animation-delay: 0.58s; }

.eiv-hero-badge {
  display: inline-block;
  padding: 0.4rem 1.25rem;
  margin-bottom: 1.5rem;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  background: #111827;
  color: #ffffff;
  border-radius: 9999px;
}
.eiv-hero-title {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 900;
  color: #111827;
  margin-bottom: 1.5rem;
  line-height: 0.95;
  letter-spacing: -0.03em;
}
.eiv-hero-title em {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 400;
  color: #1fc0d9;
}
.eiv-hero-desc {
  font-size: 1.125rem;
  color: #374151;
  max-width: 45rem;
  margin-bottom: 2rem;
  font-weight: 500;
  line-height: 1.6;
}
.eiv-hero-bullets {
  list-style: none;
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}
.eiv-hero-bullet {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 14px;
  font-weight: 700;
  color: #374151;
}
.eiv-hero-bullet-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #f0fdfa;
  border: 1px solid rgba(31, 192, 217, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1fc0d9;
  flex-shrink: 0;
  margin-top: 0.1rem;
}
.eiv-hero-bullet-icon span {
  font-size: 11px;
  font-weight: 900;
}
.eiv-hero-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.eiv-hero-btn {
  height: 3.5rem;
  padding: 0 2.5rem;
  border-radius: 9999px;
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
}
.eiv-btn-dark {
  background-color: #111827;
  color: #ffffff;
  box-shadow: 0 20px 40px -15px rgba(17, 24, 39, 0.2);
  border: none;
}
.eiv-btn-dark:hover {
  transform: translateY(-2px);
  box-shadow: 0 25px 45px -10px rgba(17, 24, 39, 0.3);
}
.eiv-btn-light {
  background-color: rgba(255,255,255,0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #111827;
  border: 1px solid #e5e7eb;
}
.eiv-btn-light:hover {
  transform: translateY(-2px);
  border-color: #111827;
  background-color: #ffffff;
}
.eiv-btn-light svg {
  color: #22c55e;
}

/* Right side: floating card */
.eiv-hero-right {
  display: flex;
  justify-content: center;
  position: relative;
}
.eiv-card-glow {
  position: absolute;
  inset: -1rem;
  background: radial-gradient(circle, rgba(31, 192, 217, 0.08) 0%, transparent 70%);
  border-radius: 3rem;
  pointer-events: none;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.eiv-floating-card {
  position: relative;
  background: #ffffff;
  border-radius: 2.5rem;
  border: 1px solid #f3f4f6;
  padding: 1.5rem;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.6), 0 20px 50px rgba(0,0,0,0.06);
  max-width: 380px;
  width: 100%;
  animation: float 6s ease-in-out infinite;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
}
.eiv-floating-card:hover {
  transform: scale(1.02) translateY(-15px);
  animation-play-state: paused;
}
.eiv-floating-card:active {
  transform: scale(0.98) translateY(-15px);
}

.eiv-card-img-wrap {
  position: relative;
  border-radius: 2rem;
  overflow: hidden;
  aspect-ratio: 4/3;
  margin-bottom: 1.5rem;
}
.eiv-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.eiv-card-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: #111827;
  color: #ffffff;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0.4rem 0.8rem;
  border-radius: 9999px;
}
.eiv-card-ref {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(4px);
  color: #374151;
  font-size: 9px;
  font-weight: 700;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}
.eiv-card-title {
  font-size: 1.125rem;
  font-weight: 800;
  color: #111827;
  line-height: 1.25;
  margin-bottom: 1rem;
}
.eiv-card-stats {
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}
.eiv-card-stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  font-weight: 700;
  color: #9ca3af;
  text-transform: uppercase;
}
.eiv-card-stat-row span:last-child {
  font-weight: 900;
}
.eiv-text-blue { color: #1fc0d9; }
.eiv-text-green { color: #16a34a; }
.eiv-text-dark { color: #111827; }
</style>

<section class="eiv-hero">
  <div class="eiv-hero-bg"></div>
  <div class="eiv-hero-overlay"></div>
  <div class="eiv-hero-container">
    
    <div class="eiv-hero-left">
      <span class="eiv-hero-badge">EDICIÓN VENDEDORES</span>
      <h1 class="eiv-hero-title">Tu Estrategia.<br><em>Tus Resultados.</em></h1>
      <p class="eiv-hero-desc">Orquestamos la venta de tu propiedad con la precisión de un reloj suizo y el alcance de una firma de medios internacional.</p>
      
      <ul class="eiv-hero-bullets">
        <li class="eiv-hero-bullet">
          <div class="eiv-hero-bullet-icon"><span>✓</span></div>
          <span><strong>Venta rápida verificada:</strong> Media de 45 días por transacción en la comarca de Gandía y Valencia.</span>
        </li>
        <li class="eiv-hero-bullet">
          <div class="eiv-hero-bullet-icon"><span>✓</span></div>
          <span><strong>Marketing editorial premium:</strong> Home staging profesional, tomas con dron 4K y recorridos en 3D.</span>
        </li>
        <li class="eiv-hero-bullet">
          <div class="eiv-hero-bullet-icon"><span>✓</span></div>
          <span><strong>Defensa legal y fiscal 360º:</strong> Gestión de plusvalías, trámites de herencia y notaría incluidos.</span>
        </li>
      </ul>
      
      <div class="eiv-hero-buttons">
        <a href="https://essenciainmobiliaria.com/valuation" class="eiv-hero-btn eiv-btn-dark">VALORACIÓN GRATUITA</a>
        <a href="https://wa.me/34647803355?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20asesoramiento%20para%20vender%20mi%20vivienda" target="_blank" rel="noopener noreferrer" class="eiv-hero-btn eiv-btn-light">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 4px;"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.004 5.319 5.322.002 11.838.002c3.158 0 6.128 1.232 8.361 3.466 2.233 2.233 3.465 5.203 3.465 8.361 0 6.518-5.317 11.838-11.838 11.838-2.006 0-3.978-.511-5.727-1.488L0 24zm6.59-4.846c1.6.95 3.197 1.45 4.675 1.45 5.378 0 9.755-4.377 9.755-9.755 0-5.378-4.377-9.755-9.755-9.755-5.38 0-9.757 4.377-9.757 9.755 0 1.636.467 3.238 1.354 4.654L1.73 19.86l4.917-1.291zM17.47 14.397c-.322-.162-1.905-.94-2.2-.108c-.295.342-.76.94-.93 1.134-.175.195-.349.21-.67.049a8.47 8.47 0 0 1-2.482-1.53c-1.927-1.72-3.23-3.846-3.602-4.484c-.372-.64.085-.926.27-.123.164.323.37.77.56 1.109c.19.342.164.64.049.885-.115.244-.94 2.263-1.15 2.766-.206.495-.413.418-.567.418-.147 0-.315-.015-.483-.015a.93.93 0 0 1-.677.315c-.244.259-.93.91-.93 2.217s.95 2.563 1.085 2.748c.135.185 1.87 2.854 4.53 4.004c.633.273 1.125.437 1.512.56.637.203 1.218.175 1.678.105c.513-.075 1.905-.78 2.174-1.53c.27-.75.27-1.395.19-1.53c-.08-.135-.295-.323-.62-.485z"/></svg>
          CONSULTA WHATSAPP
        </a>
      </div>
    </div>
    
    <div class="eiv-hero-right">
      <div class="eiv-card-glow"></div>
      <div class="eiv-floating-card">
        <div class="eiv-card-img-wrap">
          <img src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80" alt="Chalet vendido" class="eiv-card-img">
          <span class="eiv-card-badge">VENDIDO · MÉTODO MIA</span>
          <span class="eiv-card-ref">Ref: V-CH-754</span>
        </div>
        <h3 class="eiv-card-title">Chalet Moderno con Piscina Privada</h3>
        <div class="eiv-card-stats">
          <div class="eiv-card-stat-row">
            <span>PLAZO DE VENTA</span>
            <span class="eiv-text-blue">15 DÍAS</span>
          </div>
          <div class="eiv-card-stat-row">
            <span>PRECIO DE CIERRE</span>
            <span class="eiv-text-green">100% SOLICITADO</span>
          </div>
          <div class="eiv-card-stat-row">
            <span>IMPACTO TOTAL</span>
            <span class="eiv-text-dark">+2M IMPACTOS</span>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</section>
"""
    save_html_section("seccion-vender-hero.html", html)

def generate_vender_bento():
    html = """<!-- ============================================================
     SECCIÓN BENTO SERVICIOS VENDER — Essencia Inmobiliaria
     Pegar en: WordPress > Elementor > HTML Widget
     ============================================================ -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800;900&display=swap">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
<style>
.eiv-bento * { box-sizing: border-box; margin: 0; padding: 0; }
.eiv-bento {
  width: 100%;
  background-color: #111827;
  color: #ffffff;
  padding: 6rem 1.5rem;
  font-family: 'Manrope', sans-serif;
}
.eiv-bento-inner {
  max-width: 1240px;
  margin: 0 auto;
}
.eiv-bento-label {
  display: block;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #1fc0d9;
  text-align: center;
  margin-bottom: 1rem;
}
.eiv-bento-title {
  font-size: clamp(2.25rem, 4vw, 3.25rem);
  font-weight: 900;
  text-align: center;
  margin-bottom: 1.5rem;
  letter-spacing: -0.03em;
  line-height: 1.15;
  color: #ffffff;
}
.eiv-bento-header-desc {
  font-size: 1rem;
  color: #9ca3af;
  text-align: center;
  max-width: 45rem;
  margin: 0 auto 4rem auto;
  line-height: 1.6;
  font-weight: 500;
}
.eiv-bento-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}
@media (min-width: 768px) {
  .eiv-bento-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
.eiv-bento-card {
  position: relative;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 2.5rem;
  padding: 2.5rem;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 320px;
  overflow: hidden;
  cursor: pointer;
}
.eiv-bento-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(31, 192, 217, 0.08) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.eiv-bento-card:hover {
  border-color: rgba(31, 192, 217, 0.4);
  transform: translateY(-6px) scale(1.005);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.3);
}
.eiv-bento-card:active {
  transform: translateY(-6px) scale(0.99);
}
.eiv-bento-card:hover::before {
  opacity: 1;
}
@media (min-width: 768px) {
  .col-span-2 {
    grid-column: span 2 / span 2;
  }
}
.eiv-card-content {
  position: relative;
  z-index: 1;
}
.eiv-bento-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.04);
  color: #1fc0d9;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}
.eiv-bento-card:hover .eiv-bento-icon {
  background: #1fc0d9;
  color: #111827;
}
.eiv-bento-card-title {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
}
.eiv-bento-card-desc {
  font-size: 0.875rem;
  color: #9ca3af;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}
.eiv-bento-bullets {
  position: relative;
  z-index: 1;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.grid-bullets {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}
@media (min-width: 640px) {
  .grid-bullets {
    grid-template-columns: 1fr 1fr;
  }
}
.eiv-bento-bullet {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 12px;
  font-weight: 700;
  color: #e5e7eb;
}
.eiv-bento-bullet span.material-symbols-outlined {
  color: #1fc0d9;
  font-size: 16px;
}
.eiv-bento-footer {
  text-align: center;
  margin-top: 4rem;
}
.eiv-bento-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 3.5rem;
  padding: 0 2.5rem;
  border-radius: 9999px;
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  background-color: #ffffff;
  color: #111827;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 20px 40px -15px rgba(0,0,0,0.05);
}
.eiv-bento-btn:hover {
  background-color: #f3f4f6;
  transform: translateY(-2px);
}
</style>

<div class="eiv-bento">
  <div class="eiv-bento-inner">
    <span class="eiv-bento-label">EXCELENCIA 360º</span>
    <h2 class="eiv-bento-title">Servicio Completo</h2>
    <p class="eiv-bento-header-desc">Manejamos la complejidad. Usted disfruta del cierre. Un enfoque integral que cubre cada detalle legal y creativo.</p>
    
    <div class="eiv-bento-grid">
      <!-- Bloque 1: Marketing (ancho 2) -->
      <div class="eiv-bento-card col-span-2">
        <div class="eiv-card-content">
          <div class="eiv-bento-icon"><span class="material-symbols-outlined">photo_camera</span></div>
          <h3 class="eiv-bento-card-title">Marketing Editorial de Lujo</h3>
          <p class="eiv-bento-card-desc">Posicionamos tu propiedad como una obra de arte. Reportajes fotográficos y de video con calidad de revista de diseño, tomas con dron 4K y Home Staging virtual para cautivar a compradores exigentes.</p>
        </div>
        <ul class="eiv-bento-bullets grid-bullets">
          <li class="eiv-bento-bullet"><span class="material-symbols-outlined">check_circle</span>Fotografía y video 4K profesional</li>
          <li class="eiv-bento-bullet"><span class="material-symbols-outlined">check_circle</span>Sindicación premium internacional</li>
          <li class="eiv-bento-bullet"><span class="material-symbols-outlined">check_circle</span>Campañas publicitarias hiper-segmentadas</li>
        </ul>
      </div>

      <!-- Bloque 2: Legal (ancho 1) -->
      <div class="eiv-bento-card">
        <div class="eiv-card-content">
          <div class="eiv-bento-icon"><span class="material-symbols-outlined">gavel</span></div>
          <h3 class="eiv-bento-card-title">Defensa Legal Completa</h3>
          <p class="eiv-bento-card-desc">Tramitamos todos los documentos necesarios de forma gratuita: certificado energético, cédula de habitabilidad y auditoría urbanística completa para una venta segura.</p>
        </div>
        <ul class="eiv-bento-bullets">
          <li class="eiv-bento-bullet"><span class="material-symbols-outlined">check_circle</span>Certificado de Eficiencia Energética</li>
          <li class="eiv-bento-bullet"><span class="material-symbols-outlined">check_circle</span>Cédula de habitabilidad</li>
          <li class="eiv-bento-bullet"><span class="material-symbols-outlined">check_circle</span>Verificación registral y de cargas</li>
        </ul>
      </div>

      <!-- Bloque 3: Fiscal (ancho 1) -->
      <div class="eiv-bento-card">
        <div class="eiv-card-content">
          <div class="eiv-bento-icon"><span class="material-symbols-outlined">account_balance</span></div>
          <h3 class="eiv-bento-card-title">Fiscalidad e Impuestos</h3>
          <p class="eiv-bento-card-desc">Calculamos de forma exacta y anticipada tu incremento patrimonial y plusvalías. Te guiamos y representamos legalmente en notaría durante la firma final.</p>
        </div>
        <ul class="eiv-bento-bullets">
          <li class="eiv-bento-bullet"><span class="material-symbols-outlined">check_circle</span>Cálculo de Plusvalía municipal</li>
          <li class="eiv-bento-bullet"><span class="material-symbols-outlined">check_circle</span>Estudio fiscal de IRPF y exenciones</li>
          <li class="eiv-bento-bullet"><span class="material-symbols-outlined">check_circle</span>Firma y representación ante notario</li>
        </ul>
      </div>

      <!-- Bloque 4: Tecnología (ancho 2) -->
      <div class="eiv-bento-card col-span-2">
        <div class="eiv-card-content">
          <div class="eiv-bento-icon"><span class="material-symbols-outlined">insights</span></div>
          <h3 class="eiv-bento-card-title">Tecnología de Vanguardia</h3>
          <p class="eiv-bento-card-desc">Maximizamos la difusión de tu propiedad. Sincronizamos tus inmuebles en más de 120 portales nacionales e internacionales y cualificamos los prospectos mediante visitas virtuales en 3D antes de organizar visitas presenciales.</p>
        </div>
        <ul class="eiv-bento-bullets grid-bullets">
          <li class="eiv-bento-bullet"><span class="material-symbols-outlined">check_circle</span>Visita virtual 3D interactiva</li>
          <li class="eiv-bento-bullet"><span class="material-symbols-outlined">check_circle</span>Sincronización en 120+ portales</li>
          <li class="eiv-bento-bullet"><span class="material-symbols-outlined">check_circle</span>Cualificación previa del comprador</li>
        </ul>
      </div>
    </div>

    <div class="eiv-bento-footer">
      <a href="https://essenciainmobiliaria.com/valuation" class="eiv-bento-btn">
        VALORACIÓN GRATUITA
        <span class="material-symbols-outlined" style="font-size: 14px;">arrow_forward</span>
      </a>
    </div>
  </div>
</div>
"""
    save_html_section("seccion-vender-bento.html", html)

def generate_vender_vendidos():
    html = """<!-- ============================================================
     SECCIÓN VENDIDOS VENDER — Essencia Inmobiliaria
     Pegar en: WordPress > Elementor > HTML Widget
     ============================================================ -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800;900&display=swap">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
<style>
.eiv-sold * { box-sizing: border-box; margin: 0; padding: 0; }
.eiv-sold {
  width: 100%;
  background-color: #ffffff;
  padding: 6rem 1.5rem;
  font-family: 'Manrope', sans-serif;
  overflow: hidden;
}
.eiv-sold-inner {
  max-width: 1240px;
  margin: 0 auto;
}
.eiv-sold-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 3rem;
}
.eiv-sold-lbl {
  display: block;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #1fc0d9;
  margin-bottom: 0.75rem;
}
.eiv-sold-title {
  font-size: 2rem;
  font-weight: 900;
  color: #111827;
  letter-spacing: -0.02em;
  line-height: 1.15;
}
.eiv-sold-controls {
  display: flex;
  gap: 0.5rem;
}
.eiv-sold-ctrl-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}
.eiv-ctrl-prev {
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #111827;
}
.eiv-ctrl-prev:hover {
  background: #f9fafb;
}
.eiv-ctrl-next {
  background: #111827;
  color: #ffffff;
  border: none;
}
.eiv-ctrl-next:hover {
  background: #000000;
}
.eiv-sold-carousel {
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-bottom: 2rem;
  snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}
.eiv-sold-carousel::-webkit-scrollbar {
  display: none;
}
.eiv-sold-item {
  snap-align: start;
  flex-shrink: 0;
  width: 85vw;
  max-width: 400px;
  background: #ffffff;
  border-radius: 2rem;
  border: 1px solid #f3f4f6;
  overflow: hidden;
  box-shadow: 0 4px 24px -6px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  text-decoration: none;
  display: block;
}
.eiv-sold-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px -8px rgba(0,0,0,0.14);
}
.eiv-item-img-wrap {
  position: relative;
  width: 100%;
  height: 256px;
  overflow: hidden;
}
.eiv-item-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.eiv-sold-item:hover .eiv-item-img {
  transform: scale(1.03);
}
.eiv-item-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: #111827;
  color: #ffffff;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.15em;
  padding: 0.4rem 0.8rem;
  border-radius: 9999px;
}
.eiv-item-ref {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(255,255,255,0.95);
  color: #374151;
  font-size: 9px;
  font-weight: 700;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
}
.eiv-item-body {
  padding: 1.5rem;
}
.eiv-item-loc {
  font-size: 11px;
  font-weight: 700;
  color: #9ca3af;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
}
.eiv-item-title {
  font-size: 1rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.eiv-item-footer {
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.eiv-item-price-wrap {
  display: flex;
  align-items: baseline;
}
.eiv-item-price-old {
  font-size: 12px;
  font-weight: 900;
  color: #9ca3af;
  text-decoration: line-through;
  margin-right: 0.5rem;
}
.eiv-item-price-badge {
  font-size: 9px;
  font-weight: 900;
  color: #16a34a;
  background: #f0fdf4;
  border: 1px solid rgba(22, 163, 74, 0.2);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  text-transform: uppercase;
}
.eiv-item-spec {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 11px;
  font-weight: 700;
  color: #6b7280;
}
.eiv-item-spec span.material-symbols-outlined {
  font-size: 14px;
}
.eiv-sold-footer {
  text-align: center;
  margin-top: 3rem;
}
.eiv-sold-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 3rem;
  padding: 0 2.5rem;
  border-radius: 9999px;
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  background-color: #111827;
  color: #ffffff;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 20px 40px -15px rgba(17,24,39,0.2);
}
.eiv-sold-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 25px 45px -10px rgba(17,24,39,0.3);
}
</style>

<div class="eiv-sold">
  <div class="eiv-sold-inner">
    <div class="eiv-sold-header">
      <div>
        <span class="eiv-sold-lbl">Prueba de éxito</span>
        <h2 class="eiv-sold-title">Inmuebles vendidos recientemente</h2>
      </div>
      <div class="eiv-sold-controls">
        <button class="eiv-sold-ctrl-btn eiv-ctrl-prev" id="eiv-prev-btn">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <button class="eiv-sold-ctrl-btn eiv-ctrl-next" id="eiv-next-btn">
          <span class="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>

    <div class="eiv-sold-carousel" id="eiv-carousel">
      <!-- Item 1 -->
      <a href="https://wa.me/34647803355?text=Hola%2C%20estoy%20interesado%20en%20una%20propiedad%20similar%20a%20la%20referencia%20V-AT-908" target="_blank" rel="noopener noreferrer" class="eiv-sold-item">
        <div class="eiv-item-img-wrap">
          <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80" alt="Ático vendido" class="eiv-item-img">
          <span class="eiv-item-badge">VENDIDA</span>
          <span class="eiv-item-ref">Ref: V-AT-908</span>
        </div>
        <div class="eiv-item-body">
          <p class="eiv-item-loc">Playa de Gandía, Valencia</p>
          <h3 class="eiv-item-title">Ático Dúplex de Lujo en Playa de Gandía</h3>
          <div class="eiv-item-footer">
            <div class="eiv-item-price-wrap">
              <span class="eiv-item-price-old">€320.000</span>
              <span class="eiv-item-price-badge">Vendido</span>
            </div>
            <div class="eiv-item-spec">
              <span class="material-symbols-outlined">home</span>
              <span>140 m²</span>
            </div>
          </div>
        </div>
      </a>

      <!-- Item 2 -->
      <a href="https://wa.me/34647803355?text=Hola%2C%20estoy%20interesado%20en%20una%20propiedad%20similar%20a%20la%20referencia%20V-PI-621" target="_blank" rel="noopener noreferrer" class="eiv-sold-item">
        <div class="eiv-item-img-wrap">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80" alt="Piso vendido" class="eiv-item-img">
          <span class="eiv-item-badge">VENDIDA</span>
          <span class="eiv-item-ref">Ref: V-PI-621</span>
        </div>
        <div class="eiv-item-body">
          <p class="eiv-item-loc">Gandía Centro, Valencia</p>
          <h3 class="eiv-item-title">Piso Exclusivo Reformado en el Centro</h3>
          <div class="eiv-item-footer">
            <div class="eiv-item-price-wrap">
              <span class="eiv-item-price-old">€185.000</span>
              <span class="eiv-item-price-badge">Vendido</span>
            </div>
            <div class="eiv-item-spec">
              <span class="material-symbols-outlined">home</span>
              <span>115 m²</span>
            </div>
          </div>
        </div>
      </a>

      <!-- Item 3 -->
      <a href="https://wa.me/34647803355?text=Hola%2C%20estoy%20interesado%20en%20una%20propiedad%20similar%20a%20la%20referencia%20V-AD-840" target="_blank" rel="noopener noreferrer" class="eiv-sold-item">
        <div class="eiv-item-img-wrap">
          <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80" alt="Adosado vendido" class="eiv-item-img">
          <span class="eiv-item-badge">VENDIDA</span>
          <span class="eiv-item-ref">Ref: V-AD-840</span>
        </div>
        <div class="eiv-item-body">
          <p class="eiv-item-loc">Oliva Nova, Valencia</p>
          <h3 class="eiv-item-title">Adosado de Diseño cerca del Mar</h3>
          <div class="eiv-item-footer">
            <div class="eiv-item-price-wrap">
              <span class="eiv-item-price-old">€295.000</span>
              <span class="eiv-item-price-badge">Vendido</span>
            </div>
            <div class="eiv-item-spec">
              <span class="material-symbols-outlined">home</span>
              <span>135 m²</span>
            </div>
          </div>
        </div>
      </a>
    </div>

    <div class="eiv-sold-footer">
      <a href="https://wa.me/34647803355?text=Hola%2C%20quiero%20vender%20mi%20propiedad%20con%20vuestro%20m%C3%A9todo%20exitoso" target="_blank" rel="noopener noreferrer" class="eiv-sold-btn">
        Quiero vender mi casa
        <span class="material-symbols-outlined" style="font-size: 14px;">arrow_forward</span>
      </a>
    </div>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.getElementById('eiv-carousel');
  const prevBtn = document.getElementById('eiv-prev-btn');
  const nextBtn = document.getElementById('eiv-next-btn');

  if (carousel && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', function() {
      carousel.scrollBy({ left: -320, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', function() {
      carousel.scrollBy({ left: 320, behavior: 'smooth' });
    });
  }
});
</script>
"""
    save_html_section("seccion-vender-vendidos.html", html)

if __name__ == "__main__":
    update_asesores()
    update_mia()
    generate_hero()
    generate_stats()
    generate_ai_portals()
    generate_contact()
    generate_vender_hero()
    generate_vender_bento()
    generate_vender_vendidos()
    print("All WP HTML sections generated and updated.")

