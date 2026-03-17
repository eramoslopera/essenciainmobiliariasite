import React from 'react';
import { useLocation } from 'react-router-dom';

const SchemaMarkup: React.FC = () => {
    const location = useLocation();
    const baseUrl = 'https://essenciainmobiliaria.com';

    // Organization schema — always present
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "name": "Essencia Inmobiliaria",
        "url": baseUrl,
        "logo": `${baseUrl}/Logo_Negro.svg`,
        "image": `${baseUrl}/Logo_Negro.svg`,
        "description": "Propiedades inmobiliarias exclusivas en Valencia. Compra, vende y valora tu vivienda con Essencia Inmobiliaria, la inmobiliaria premium de Gandia y la costa de Valencia.",
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
            "latitude": 38.967,
            "longitude": -0.181
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "19:00"
        },
        "sameAs": [
            "https://instagram.com/essenciainmobiliaria",
            "https://facebook.com/essenciainmobiliaria",
            "https://linkedin.com/company/essenciainmobiliaria"
        ],
        "areaServed": {
            "@type": "State",
            "name": "Valencia"
        },
        "priceRange": "€€€"
    };

    // BreadcrumbList schema — for interior pages
    const getBreadcrumbSchema = () => {
        const pathParts = location.pathname.split('/').filter(Boolean);
        if (pathParts.length === 0) return null;

        const items = [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": baseUrl },
            ...pathParts.map((part, i) => ({
                "@type": "ListItem" as const,
                "position": i + 2,
                "name": part.charAt(0).toUpperCase() + part.slice(1),
                "item": `${baseUrl}/${pathParts.slice(0, i + 1).join('/')}`
            }))
        ];

        return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": items
        };
    };

    // WebSite schema — enables sitelinks search box in Google
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Essencia Inmobiliaria",
        "url": baseUrl,
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${baseUrl}/properties?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
        }
    };

    const breadcrumbSchema = getBreadcrumbSchema();

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            {breadcrumbSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                />
            )}
        </>
    );
};

export default SchemaMarkup;
