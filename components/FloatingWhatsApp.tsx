import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WhatsappLogo } from '@phosphor-icons/react';

const FloatingWhatsApp: React.FC = () => {
    const whatsappUrl = "https://wa.me/34647803355";
    const [isAutoVisible, setIsAutoVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const showTimer = setTimeout(() => {
            setIsAutoVisible(true);
        }, 3000); // Show message after 3 seconds

        const hideTimer = setTimeout(() => {
            setIsAutoVisible(false);
        }, 8000); // Hide message 5 seconds after showing

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    const isVisible = isAutoVisible || isHovered;

    return (
        <div
            className="floating-whatsapp fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 transition-all duration-300"
            onMouseEnter={() => {
                setIsHovered(true);
                setIsAutoVisible(false);
            }}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="bg-white p-4 rounded-2xl rounded-br-none shadow-xl max-w-[250px] relative mb-2"
                    >
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsAutoVisible(false);
                            }}
                            className="absolute -top-2 -left-2 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-500 hover:bg-red-500 hover:text-white transition-colors"
                        >
                            ×
                        </button>
                        <p className="text-sm text-gray-800 font-medium">
                            ¡Hola! 👋 ¿Te ayudamos a encontrar tu propiedad ideal?
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[60px] h-[60px] bg-[#25d366] rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] flex items-center justify-center hover:scale-110 hover:shadow-[0_6px_16px_rgba(37,211,102,0.3)] transition-all duration-300 z-50 float-right"
                aria-label="Contactar por WhatsApp"
            >
                <WhatsappLogo weight="fill" className="w-8 h-8 text-white" />
            </a>
        </div>
    );
};

export default FloatingWhatsApp;
