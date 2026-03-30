import React, { useRef } from 'react';
import { useScroll, motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import {
  ChatCircleText,
  TrendUp,
  Brain,
  UsersThree,
  Handshake,
  VideoCamera,
  Camera,
  ShareNetwork,
  Briefcase,
  CheckCircle,
} from '@phosphor-icons/react';

const steps = [
  { id: 1, icon: ChatCircleText },
  { id: 2, icon: TrendUp },
  { id: 3, icon: Brain },
  { id: 4, icon: UsersThree },
  { id: 5, icon: Handshake },
  { id: 6, icon: VideoCamera },
  { id: 7, icon: Camera },
  { id: 8, icon: ShareNetwork },
  { id: 9, icon: Briefcase },
  { id: 10, icon: CheckCircle },
];

export const InteractiveMarketingSection: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Optional: We can use scroll tracking if we want to add parallax to backgrounds or indicators
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section ref={containerRef} className="relative bg-editorial-gray py-24 px-6 lg:px-24">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative">
        
        {/* Left Side: Sticky Content */}
        <div className="lg:col-span-5 relative">
          <div className="lg:sticky lg:top-32 h-fit flex flex-col justify-center">
            <div>
              <span className="inline-block py-1 px-4 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-white/90 backdrop-blur-sm text-brand-blue-600 border border-brand-blue-100 rounded-full shadow-sm">
                {t('landing.mia.exclusive')}
              </span>
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black text-editorial-black tracking-tight leading-[1.1] mb-6">
                {t('landing.mia.id')}
              </h2>
              <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-lg">
                {t('landing.marketing.desc') || t('home.marketing.subtitle')}
              </p>
            </div>

            <div className="mt-12 hidden lg:block">
              {/* Media element with premium styling */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-gray-200/50">
                <img 
                  src="https://fotos15.apinmo.com/1909/27341402/1-1.jpg" 
                  alt="Marketing Process" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-editorial-black/60 to-transparent mix-blend-multiply"></div>
                <div className="absolute bottom-6 left-6 text-white font-bold tracking-widest uppercase text-sm">
                  Essencia <span className="text-brand-blue-400">Marketing</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Scrollable Listing */}
        <div className="lg:col-span-7 flex flex-col gap-8 pb-[10vh]">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="relative bg-white p-8 md:p-10 rounded-2xl shadow-editorial border border-gray-100 overflow-hidden group"
              >
                {/* Background Decor */}
                <div className="absolute -right-4 -top-8 text-[10rem] font-bold text-gray-50/50 pointer-events-none transition-transform group-hover:scale-110 duration-500">
                  {step.id.toString().padStart(2, '0')}
                </div>
                
                {/* Number Badge (Visible on mobile/tablet) */}
                <div className="absolute top-8 right-8 lg:hidden opacity-20">
                  <span className="font-display text-5xl font-extrabold">{step.id.toString().padStart(2, '0')}</span>
                </div>

                <div className="relative z-10">
                  <div className="h-16 w-16 rounded-xl bg-brand-blue-50/50 border border-brand-blue-100/50 flex items-center justify-center mb-6 group-hover:bg-brand-blue-500 transition-colors duration-500">
                    <Icon size={32} weight="duotone" className="text-brand-blue-500 group-hover:text-white transition-colors duration-500" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-editorial-black tracking-tight mb-2">
                    {t(`landing.mia.step${step.id}.title`)}
                  </h3>
                  
                  <p className="inline-block py-1 pr-4 text-xs font-bold tracking-widest uppercase text-brand-blue-600 mb-4 border-b border-brand-blue-100">
                    {t(`landing.mia.step${step.id}.subtitle`)}
                  </p>
                  
                  <p className="text-gray-500 leading-relaxed text-base font-medium">
                    {t(`landing.mia.step${step.id}.long_desc`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}

export default InteractiveMarketingSection;
