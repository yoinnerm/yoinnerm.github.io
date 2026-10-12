export interface BusinessInfo {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  mapsUrl: string;
  whatsappUrl: string;
  whatsappDisplay: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  socials: {
    instagram: string;
    tiktok: string;
    facebook: string;
  };
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'bodas' | 'infantiles' | 'gelatinas' | 'pasapalos' | 'galletas';
  categoryLabel: string;
  image: string;
  description: string;
  details?: string;
  portions?: string;
  occasion?: string;
  tags?: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  features: string[];
  idealFor: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  date: string;
  location: string;
  quote: string;
  event?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
