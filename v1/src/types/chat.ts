export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  modelUsed?: string;
  isStreaming?: boolean;
  error?: boolean;
}

export interface ChatRole {
  id: string;
  name: string;
  badge: string;
  avatar: string;
  description: string;
  systemInstruction: string;
  recommendedModel: string;
  colorScheme: {
    bg: string;
    text: string;
    border: string;
    accent: string;
  };
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  price: number;
  icon: string;
  rating: number;
  reviews: number;
  description: string;
  tag?: string;
}

export interface QuickPrompt {
  id: string;
  label: string;
  prompt: string;
  icon: string;
}
