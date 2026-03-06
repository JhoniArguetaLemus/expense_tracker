import React, { useState } from 'react';
import { ThemeProvider } from './src/context/ThemeContext';
import { HomeScreen } from './src/screens/HomeScreen';
import { AddExpenseScreen } from './src/screens/AddExpenseScreen';
import { useExpenses } from './src/hooks/useExpenses';

type Screen = 'home' | 'add';

function AppContent() {
  const [screen, setScreen] = useState<Screen>('home');
  const expensesData = useExpenses();

  if (screen === 'add') {
    return (
      <AddExpenseScreen
        onBack={() => setScreen('home')}
        addExpense={expensesData.addExpense}
      />
    );
  }

  return (
    <HomeScreen
      onAddPress={() => setScreen('add')}
      expenses={expensesData.expenses}
      loading={expensesData.loading}
      deleteExpense={expensesData.deleteExpense}
      total={expensesData.total}
    />
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}