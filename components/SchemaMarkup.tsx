import React from 'react';
import { useLocation } from 'react-router-dom';

const SchemaMarkup: React.FC = () => {
    const location = useLocation();
    const baseUrl = 'https://essenciainmobiliaria.com';
    const isHome = location.pathname === '/' || location.pathname === '';

    // ─── 1. RealEstateAgent — replaces generic Organization ───────────────────
    // Using @type RealEstateAgent (subtype of LocalBusiness) for maximum GEO/SEO value
    const realEstateAgentSchema = {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "@id": `${baseUrl}/#realestateagent`,
        "name": "Essencia Inmobiliaria",
        "alternateName": "Essencia Inmobiliaria Gandia",
        "url": baseUrl,
        "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/Logo_Negro.svg`,
            "width": 263,
            "height": 110
        },
        "image": `${baseUrl}/Logo_Negro.svg`,
        "description": "Inmobiliaria premium en Gandia y Valencia especializada en venta de propiedades de lujo. Con el Método MIA (Marketing de Alto Impacto) vendemos tu vivienda en una media de 45 días al mayor precio posible.",
        "telephone": "+34647803355",
        "email": "santitorres@essenciainmobiliaria.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "C/ Sant Vicent Ferrer 24",
            "addressLocality": "Gandia",
            "addressRegion": "Valencia",
            "postalCode": "46701",
            "addressCountry": "ES"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 38.9675,
            "longitude": -0.1813
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "19:00"
            }
        ],
        "priceRange": "€€€",
        "currenciesAccepted": "EUR",
        "paymentAccepted": "Cash, Credit Card, Bank Transfer",
        "areaServed": [
            {
                "@type": "City",
                "name": "Gandia",
                "@id": "https://www.wikidata.org/wiki/Q185729"
            },
            {
                "@type": "City",
                "name": "Valencia",
                "@id": "https://www.wikidata.org/wiki/Q8818"
            },
            {
                "@type": "City",
                "name": "Oliva"
            },
            {
                "@type": "City",
                "name": "Dénia"
            }
        ],
        "knowsAbout": [
            "Venta de viviendas",
            "Home staging",
            "Valoración inmobiliaria",
            "Marketing inmobiliario",
            "Compra de propiedades de lujo",
            "Asesoría inmobiliaria en Valencia"
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Servicios Inmobiliarios Essencia",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Venta de propiedades",
                        "description": "Venta de viviendas con el Método MIA — Marketing de Alto Impacto. Tiempo medio de venta: 45 días."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Valoración gratuita",
                        "description": "Valoración precisa de su propiedad basada en datos de mercado actuales y comparables reales."
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Home Staging profesional",
                        "description": "Puesta en escena profesional de la vivienda para maximizar el precio de venta."
                    }
                }
            ]
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.6",
            "bestRating": "5",
            "worstRating": "1",
            "ratingCount": "349",
            "reviewCount": "349"
        },
        "sameAs": [
            "https://www.instagram.com/essencia_inmobiliaria/",
            "https://www.facebook.com/essenciainmobiliariagandia",
            "https://www.linkedin.com/in/santi-torres-essencia-a9497311/"
        ]
    };

    // ─── 2. WebSite — enables Sitelinks Search Box ────────────────────────────
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "name": "Essencia Inmobiliaria",
        "alternateName": "Essencia Inmobiliarias Gandía",
        "url": baseUrl,
        "publisher": {
            "@id": `${baseUrl}/#realestateagent`
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${baseUrl}/properties?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
        }
    };

    // ─── 3. FAQPage — rich snippets in Google SERP ────────────────────────────
    // Only rendered on the home page where the FAQ section lives
    const faqSchema = isHome ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "name": "Preguntas frecuentes — Essencia Inmobiliaria",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "¿Cómo determinan el precio de mi propiedad?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Utilizamos datos de mercado en tiempo real, comparables vendidos recientemente y nuestra experiencia local para fijar un precio competitivo y realista."
                }
            },
            {
                "@type": "Question",
                "name": "¿Trabajan con contrato de exclusividad?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sí, para garantizar la máxima inversión en marketing y dedicación de nuestro equipo, trabajamos con mandatos de venta exclusivos."
                }
            },
            {
                "@type": "Question",
                "name": "¿Cuánto tiempo tardará en venderse?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "El tiempo medio varía según la propiedad, pero nuestra estrategia de marketing intensiva suele reducir los plazos del mercado significativamente. Nuestra media actual es de 45 días."
                }
            },
            {
                "@type": "Question",
                "name": "¿Qué incluye su comisión?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Incluye valoración, home staging, fotografía profesional, marketing internacional, gestión de visitas y trámites legales hasta la firma."
                }
            },
            {
                "@type": "Question",
                "name": "¿Debo reformar antes de vender?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No siempre. Realizamos un diagnóstico para recomendar solo las mejoras que aumenten realmente el valor de venta."
                }
            },
            {
                "@type": "Question",
                "name": "¿Cómo filtran a los compradores?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Verificamos la identidad y capacidad financiera de cada interesado antes de organizar una visita física."
                }
            },
            {
                "@type": "Question",
                "name": "¿Se encargan de los trámites legales?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutamente. Nuestro departamento jurídico supervisa contratos, certificados y coordina con la notaría."
                }
            },
            {
                "@type": "Question",
                "name": "¿Qué pasa si no se vende?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Si no vendemos su propiedad en el plazo acordado, no cobramos nada. Asumimos el riesgo de la inversión en marketing."
                }
            },
            {
                "@type": "Question",
                "name": "¿Qué impuestos debo pagar al vender mi casa?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Principalmente dos: la Plusvalía Municipal (que depende del ayuntamiento) y el IRPF sobre la ganancia patrimonial obtenida (entre el 19% y el 28%). Si reinvierte en vivienda habitual o es mayor de 65 años, podría estar exento del IRPF. Nuestro departamento fiscal le hará un cálculo exacto antes de poner la propiedad a la venta."
                }
            },
            {
                "@type": "Question",
                "name": "¿Qué documentos necesito para vender mi propiedad?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Necesitará la escritura de propiedad, el DNI de los titulares, el recibo del IBI, el certificado de eficiencia energética (CEE) y la cédula de habitabilidad. Si es un piso, también el certificado de estar al corriente con la comunidad. Nosotros nos encargamos de recopilar y gestionar toda esta documentación técnica y legal."
                }
            }
        ]
    } : null;

    // ─── 4. BreadcrumbList — for interior pages ───────────────────────────────
    const getBreadcrumbSchema = () => {
        const pathParts = location.pathname.split('/').filter(Boolean);
        if (pathParts.length === 0) return null;

        const labelMap: Record<string, string> = {
            'properties': 'Propiedades',
            'contact': 'Contacto',
            'about': 'Sobre Nosotros',
            'sell': 'Vender',
            'valuation': 'Valoración',
            'stories': 'Historias',
        };

        const items = [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": baseUrl },
            ...pathParts.map((part, i) => ({
                "@type": "ListItem" as const,
                "position": i + 2,
                "name": labelMap[part] ?? (part.charAt(0).toUpperCase() + part.slice(1)),
                "item": `${baseUrl}/${pathParts.slice(0, i + 1).join('/')}`
            }))
        ];

        return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": items
        };
    };

    const breadcrumbSchema = getBreadcrumbSchema();

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateAgentSchema, null, 0) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema, null, 0) }}
            />
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema, null, 0) }}
                />
            )}
            {breadcrumbSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema, null, 0) }}
                />
            )}
        </>
    );
};

export default SchemaMarkup;
