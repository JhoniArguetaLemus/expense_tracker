import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BUDGET_KEY = '@monthly_budget';

export function useBudget() {
  const [budget, setBudgetState] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(BUDGET_KEY);
        if (stored) setBudgetState(parseFloat(stored));
      } catch (e) {
        console.error('Failed to load budget', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const setBudget = async (amount: number) => {
    setBudgetState(amount);
    await AsyncStorage.setItem(BUDGET_KEY, amount.toString());
  };

  const clearBudget = async () => {
    setBudgetState(null);
    await AsyncStorage.removeItem(BUDGET_KEY);
  };

  return { budget, loading, setBudget, clearBudget };
}