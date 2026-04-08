import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface ContactFormProps {
  theme?: 'dark' | 'light';
  defaultReason?: string;
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ theme = 'dark', defaultReason = 'buy', className = '' }) => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState(defaultReason);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const isDark = theme === 'dark';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const waMessage = [
      `¡Hola! Me pongo en contacto desde vuestra web.`,
      ``,
      `*Nombre:* ${name}`,
      email ? `*Email:* ${email}` : '',
      phone ? `*Teléfono:* ${phone}` : '',
      `*Interés:* ${reason}`,
      message ? `\n*Mensaje:*\n${message}` : ''
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/34647803355?text=${encodeURIComponent(waMessage)}`, '_blank', 'noopener,noreferrer');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const containerClasses = isDark
    ? "bg-white/5 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] rounded-3xl p-8 backdrop-blur-md"
    : "bg-white border border-gray-100 shadow-diffusion rounded-3xl p-8";

  const labelClasses = `block text-xs font-bold uppercase tracking-widest mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`;
  const inputClasses = `w-full bg-transparent border-b rounded-none px-0 py-3 text-sm focus:outline-none transition-colors ${
    isDark 
      ? 'border-white/20 text-white placeholder-gray-600 focus:border-white' 
      : 'border-gray-200 text-editorial-black placeholder-gray-400 focus:border-editorial-black'
  }`;

  return (
    <div className={`${containerClasses} ${className}`}>
      {sent ? (
        <div className="flex flex-col items-center justify-center h-full min-h-[320px] gap-4 text-center">
          <span className={`material-symbols-outlined text-5xl ${isDark ? 'text-green-400' : 'text-green-500'}`}>check_circle</span>
          <p className={`font-bold text-lg ${isDark ? 'text-white' : 'text-editorial-black'}`}>¡WhatsApp abierto!</p>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Envía el mensaje para que os podamos contactar.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="form-name" className={labelClasses}>{t('common.name') || 'Nombre'}</label>
              <input id="form-name" type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="María García" className={inputClasses} />
            </div>
            <div>
              <label htmlFor="form-phone" className={labelClasses}>{t('common.phone') || 'Teléfono'}</label>
              <input id="form-phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+34 600 000 000" className={inputClasses} />
            </div>
          </div>
          <div>
            <label htmlFor="form-email" className={labelClasses}>{t('common.email') || 'Email'}</label>
            <input id="form-email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="maria@example.com" className={inputClasses} />
          </div>
          <div>
            <label htmlFor="form-reason" className={labelClasses}>{t('home.contact.reason.label')}</label>
            <select id="form-reason" value={reason} onChange={e => setReason(e.target.value)} className={`${inputClasses} appearance-none`} aria-label={t('home.contact.reason.label')}>
              <option value="buy" className={isDark ? "bg-editorial-black" : ""}>{t('home.contact.reason.buy')}</option>
              <option value="sell" className={isDark ? "bg-editorial-black" : ""}>{t('home.contact.reason.sell')}</option>
              <option value="valuation" className={isDark ? "bg-editorial-black" : ""}>{t('home.contact.reason.valuation')}</option>
              <option value="invest" className={isDark ? "bg-editorial-black" : ""}>{t('home.contact.reason.invest')}</option>
              <option value="other" className={isDark ? "bg-editorial-black" : ""}>{t('home.contact.reason.other')}</option>
            </select>
          </div>
          <div>
            <label htmlFor="form-message" className={labelClasses}>{t('common.message')}</label>
            <textarea id="form-message" rows={4} value={message} onChange={e => setMessage(e.target.value)} placeholder={t('home.contact.message.placeholder')} className={`${inputClasses} resize-none`} />
          </div>
          <button 
            type="submit" 
            className={`w-full font-bold py-4 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] flex items-center justify-center gap-2 text-xs tracking-[0.2em] uppercase mt-6 border ${
              isDark
                ? 'bg-white text-editorial-black border border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-0.5 focus:ring-white shadow-sm'
                : 'bg-editorial-black text-white border-transparent hover:bg-gray-900 hover:shadow-diffusion-hover hover:-translate-y-0.5 focus:ring-editorial-black shadow-diffusion'
            }`}
          >
            {t('home.contact.send') || 'Enviar mensaje'}
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
          <p className={`text-xs text-center mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {t('detail.form.privacy') || 'Tu información está protegida. Nunca compartimos tus datos.'}
          </p>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
