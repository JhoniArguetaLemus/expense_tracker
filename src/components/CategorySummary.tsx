import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Expense, CATEGORIES, Category } from '../types';

interface Props {
  expenses: Expense[];
}

export function CategorySummary({ expenses }: Props) {
  const totals = expenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  const max = sorted[0]?.[1] || 1;

  if (sorted.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spending by Category</Text>
      {sorted.map(([cat, amount]) => {
        const { emoji, label, color } = CATEGORIES[cat as Category];
        const width = `${(amount / max) * 100}%` as `${number}%`;
        return (
          <View key={cat} style={styles.row}>
            <Text style={styles.emoji}>{emoji}</Text>
            <View style={styles.barContainer}>
              <Text style={styles.label}>{label}</Text>
              <View style={styles.barBg}>
                <View style={[styles.bar, { width, backgroundColor: color }]} />
              </View>
            </View>
            <Text style={[styles.amount, { color }]}>${amount.toFixed(0)}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  title:   { color: '#0C1A2E', fontSize: 16, fontWeight: '700', marginBottom: 14 },
  row:     { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 10 },
  emoji:   { fontSize: 20, width: 28 },
  barContainer: { flex: 1 },
  label:   { color: '#94A3B8', fontSize: 11, marginBottom: 4 },
  barBg:   { backgroundColor: '#E0F2FE', borderRadius: 4, height: 8, overflow: 'hidden' },
  bar:     { height: 8, borderRadius: 4 },
  amount:  { fontSize: 13, fontWeight: '700', width: 48, textAlign: 'right' },
});