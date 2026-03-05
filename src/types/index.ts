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
  date: string; // ISO string
}

export const CATEGORIES: Record<Category, { label: string; emoji: string; color: string }> = {
  food:          { label: 'Food',          emoji: '🍔', color: '#FF6B6B' },
  transport:     { label: 'Transport',     emoji: '🚗', color: '#4ECDC4' },
  entertainment: { label: 'Entertainment', emoji: '🎮', color: '#A855F7' },
  health:        { label: 'Health',        emoji: '💊', color: '#22C55E' },
  shopping:      { label: 'Shopping',      emoji: '🛍️', color: '#F59E0B' },
  other:         { label: 'Other',         emoji: '📦', color: '#6B7280' },
};