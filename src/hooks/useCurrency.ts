import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Currency, CURRENCIES } from '../types';

const CURRENCY_KEY = '@currency';

export function useCurrency() {
  const [currency, setCurrencyState] = useState<Currency>(CURRENCIES[0]); // default USD

  useEffect(() => {
    AsyncStorage.getItem(CURRENCY_KEY).then(stored => {
      if (stored) {
        const found = CURRENCIES.find(c => c.code === stored);
        if (found) setCurrencyState(found);
      }
    });
  }, []);

  const setCurrency = async (c: Currency) => {
    setCurrencyState(c);
    await AsyncStorage.setItem(CURRENCY_KEY, c.code);
  };

  const format = (amount: number) =>
    `${currency.symbol}${amount.toFixed(2)}`;

  return { currency, setCurrency, format };
}