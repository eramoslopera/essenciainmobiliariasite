import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  ArrowRight
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
  const { t, language } = useLanguage();

  return (
    <section className="py-24 lg:py-32 bg-editorial-gray/30 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-[800px] bg-brand-blue-50/50 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Column — Sticky Header & Large CTA */}
          <div className="col-span-1 md:col-span-5 lg:col-span-4 relative">
            <div className="md:sticky md:top-32 h-fit mb-12 md:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-8 h-[1px] bg-brand-blue-600" />
                  <span className="text-[10px] font-black tracking-[0.25em] uppercase text-brand-blue-600">
                    {t('landing.mia.exclusive')}
                  </span>
                </div>
                
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-editorial-black tracking-tighter leading-[1.05] mb-8">
                  {t('landing.mia.id')}
                </h2>
                
                <p className="text-gray-500 text-lg leading-relaxed mb-12 font-medium max-w-sm">
                  {t('landing.marketing.desc') || t('home.marketing.subtitle')}
                </p>
                
                <Link 
                  to="/sell" 
                  className="group relative inline-flex items-center gap-6 bg-editorial-black text-white hover:bg-brand-blue-600 h-16 pl-8 pr-2 rounded-full transition-all duration-500 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] active:scale-[0.98] overflow-hidden"
                >
                  <span className="text-xs font-bold tracking-[0.2em] relative z-10 whitespace-nowrap uppercase">
                    {language === 'es' ? 'Vende con Essencia' : 'Sell with Essencia'}
                  </span>
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-105 group-hover:bg-white transition-all duration-300 relative z-10">
                     <ArrowRight size={20} weight="bold" className="text-white group-hover:text-brand-blue-600" />
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Right Column — Scrolling Steps Grid */}
          <div className="col-span-1 md:col-span-7 lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 relative pb-12">
               {steps.map((step, index) => {
                 const Icon = step.icon;
                 // Asymmetric layout logic for masonry feel on desktop
                 const isEvenColumn = index % 2 === 1;
                 const marginTopClass = isEvenColumn ? "sm:mt-24" : "sm:mt-0";

                 return (
                    <motion.div 
                      key={step.id} 
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className={`bg-white rounded-[2rem] p-8 lg:p-10 border border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] transition-all group flex flex-col relative overflow-hidden ${marginTopClass}`}
                    >
                       <div className="absolute -right-16 -top-16 w-48 h-48 bg-gray-50/50 rounded-full blur-3xl group-hover:bg-brand-blue-50/80 transition-colors duration-700 pointer-events-none" />
                       
                       {/* Subtle step number watermark */}
                       <div className="absolute right-6 top-6 text-6xl font-black text-gray-50 group-hover:-translate-y-2 group-hover:text-brand-blue-50/50 transition-all duration-500 pointer-events-none z-0">
                         {step.id.toString().padStart(2, '0')}
                       </div>

                       <div className="relative z-10 flex flex-col h-full">
                          <div className="h-14 w-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-brand-blue-50 group-hover:border-brand-blue-100 transition-all duration-500 shadow-sm">
                            <Icon size={24} weight="fill" className="text-editorial-black group-hover:text-brand-blue-600 transition-colors duration-500" />
                          </div>
                          
                          <div className="mt-auto pt-6 border-t border-gray-100">
                            <p className="text-[10px] font-black tracking-widest uppercase text-brand-blue-600 mb-2 opacity-80">
                              {t(`landing.mia.step${step.id}.subtitle`)}
                            </p>
                            <h3 className="text-xl lg:text-2xl font-black text-editorial-black tracking-tight mb-4">
                              {t(`landing.mia.step${step.id}.title`)}
                            </h3>
                              
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">
                              {t(`landing.mia.step${step.id}.long_desc`)}
                            </p>
                          </div>
                       </div>
                    </motion.div>
                 )
               })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default InteractiveMarketingSection; 
