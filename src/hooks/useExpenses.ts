import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Expense } from '../types';

const STORAGE_KEY = '@expenses';

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  // Load from storage on mount
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setExpenses(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load expenses', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Persist to storage whenever expenses change
  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses)).catch(console.error);
    }
  }, [expenses, loading]);

  const addExpense = useCallback((expense: Omit<Expense, 'id' | 'date'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setExpenses(prev => [newExpense, ...prev]);
  }, []);

  const deleteExpense = useCallback((id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  }, []);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return { expenses, loading, addExpense, deleteExpense, total };
}