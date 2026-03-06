export type Category =
  | 'food'
  | 'transport'
  | 'entertainment'
  | 'health'
  | 'shopping'
  | 'other';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: Category;
  date: string;
}

export const CATEGORIES: Record<Category, { label: string; emoji: string; color: string }> = {
  food:          { label: 'Food',          emoji: '🍔', color: '#FF6B6B' },
  transport:     { label: 'Transport',     emoji: '🚗', color: '#4ECDC4' },
  entertainment: { label: 'Entertainment', emoji: '🎮', color: '#A855F7' },
  health:        { label: 'Health',        emoji: '💊', color: '#22C55E' },
  shopping:      { label: 'Shopping',      emoji: '🛍️', color: '#F59E0B' },
  other:         { label: 'Other',         emoji: '📦', color: '#6B7280' },
};

export interface Currency {
  code: string;
  symbol: string;
  label: string;
  flag: string;
}

export const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$',  label: 'US Dollar',         flag: '🇺🇸' },
  { code: 'EUR', symbol: '€',  label: 'Euro',              flag: '🇪🇺' },
  { code: 'MXN', symbol: '$',  label: 'Mexican Peso',      flag: '🇲🇽' },
  { code: 'GTQ', symbol: 'Q',  label: 'Guatemalan Quetzal',flag: '🇬🇹' },
  { code: 'HNL', symbol: 'L',  label: 'Honduran Lempira',  flag: '🇭🇳' },
  { code: 'CRC', symbol: '₡',  label: 'Costa Rican Colón', flag: '🇨🇷' },
  { code: 'COP', symbol: '$',  label: 'Colombian Peso',    flag: '🇨🇴' },
  { code: 'GBP', symbol: '£',  label: 'British Pound',     flag: '🇬🇧' },
  { code: 'JPY', symbol: '¥',  label: 'Japanese Yen',      flag: '🇯🇵' },
];