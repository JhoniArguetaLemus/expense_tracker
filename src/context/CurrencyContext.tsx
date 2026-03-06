import React, { createContext, useContext } from 'react';
import { useCurrency } from '../hooks/useCurrency';
import { Currency } from '../types';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  format: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: { code: 'USD', symbol: '$', label: 'US Dollar', flag: '🇺🇸' },
  setCurrency: () => {},
  format: (amount) => `$${amount.toFixed(2)}`,
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const currencyData = useCurrency();
  return (
    <CurrencyContext.Provider value={currencyData}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrencyContext = () => useContext(CurrencyContext);