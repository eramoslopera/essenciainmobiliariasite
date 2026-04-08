
export interface Badge {
    text: string;
    type: 'standard' | 'photo' | 'coming-soon';
    variant?: 'primary' | 'black' | 'white';
}

export interface Property {
    id: number | string;
    title: string;
    location: string;
    price: string;
    beds?: number;
    baths?: number;
    size: string;           // built m²
    plot?: string;          // parcela exterior m² (from XML <plot>)
    pool?: boolean;         // piscina (from XML <pool>)
    image: string;
    images?: string[];
    description?: {
        en: string;
        es: string;
    };
    features?: string[];
    type: 'Villa' | 'Apartment' | 'Project' | 'Estate' | 'Townhouse' | 'House' | 'Commercial';
    badges?: Badge[];
    isComingSoon?: boolean;
    dateListed: string;
    dateSold?: string;
    lat: number;
    lng: number;
    status: 'available' | 'reserved' | 'sold';
    priceFreq: 'sale' | 'rent';
    virtualTourUrl?: string; // Floorfy / 360 tour URL
    videoUrl?: string;       // YouTube URL
    ref?: string;            // CRM internal reference
}
