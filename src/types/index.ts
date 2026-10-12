export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  idealFor: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'bodas' | 'infantiles' | 'gelatinas' | 'pasapalos' | 'galletas';
  categoryLabel: string;
  description: string;
  details: string;
  image: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  event: string;
  quote: string;
  rating: number;
  date: string;
}

export interface ContactSubmission {
  id?: string;
  nombre: string;
  telefono: string;
  tipoEvento: string;
  fechaEvento: string;
  horarioContacto: '9 a 13' | '14 a 20';
  mensaje: string;
  fechaRegistro?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'mascot';
  text: string;
  timestamp: string;
}
