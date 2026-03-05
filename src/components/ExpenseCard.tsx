import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Expense, CATEGORIES } from '../types';

interface Props {
  expense: Expense;
  onDelete: (id: string) => void;
}

export function ExpenseCard({ expense, onDelete }: Props) {
  const cat = CATEGORIES[expense.category];
  const date = new Date(expense.date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric',
  });

  return (
    <View style={[styles.card, { borderLeftColor: cat.color }]}>
      <View style={styles.left}>
        <Text style={styles.emoji}>{cat.emoji}</Text>
        <View>
          <Text style={styles.title}>{expense.title}</Text>
          <Text style={styles.meta}>{cat.label} · {date}</Text>
        </View>
      </View>
      <View style={styles.right}>
        <Text style={styles.amount}>${expense.amount.toFixed(2)}</Text>
        <TouchableOpacity onPress={() => onDelete(expense.id)} style={styles.deleteBtn}>
          <Text style={styles.deleteText}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 4,
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  emoji: { fontSize: 28 },
  title: { color: '#0C1A2E', fontSize: 15, fontWeight: '600' },
  meta:  { color: '#94A3B8', fontSize: 12, marginTop: 2 },
  right: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  amount: { color: '#0EA5E9', fontSize: 16, fontWeight: '700' },
  deleteBtn: {
    backgroundColor: '#F0F9FF',
    borderRadius: 8,
    padding: 6,
  },
  deleteText: { color: '#94A3B8', fontSize: 12 },
});