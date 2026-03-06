import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Expense, CATEGORIES } from '../types';
import { useTheme } from '../context/ThemeContext';

interface Props {
  expense: Expense;
  onDelete: (id: string) => void;
}

export function ExpenseCard({ expense, onDelete }: Props) {
  const { colors } = useTheme();
  const cat = CATEGORIES[expense.category];
  const date = new Date(expense.date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric',
  });

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderLeftColor: cat.color, shadowColor: colors.shadow }]}>
      <View style={styles.left}>
        <Text style={styles.emoji}>{cat.emoji}</Text>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>{expense.title}</Text>
          <Text style={[styles.meta, { color: colors.textMuted }]}>{cat.label} · {date}</Text>
        </View>
      </View>
      <View style={styles.right}>
        <Text style={[styles.amount, { color: colors.primary }]}>${expense.amount.toFixed(2)}</Text>
        <TouchableOpacity onPress={() => onDelete(expense.id)} style={[styles.deleteBtn, { backgroundColor: colors.primaryLight }]}>
          <Text style={[styles.deleteText, { color: colors.textMuted }]}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12, padding: 16, marginBottom: 10,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderLeftWidth: 4, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 6, elevation: 2,
  },
  left:       { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  emoji:      { fontSize: 28 },
  title:      { fontSize: 15, fontWeight: '600' },
  meta:       { fontSize: 12, marginTop: 2 },
  right:      { flexDirection: 'row', alignItems: 'center', gap: 12 },
  amount:     { fontSize: 16, fontWeight: '700' },
  deleteBtn:  { borderRadius: 8, padding: 6 },
  deleteText: { fontSize: 12 },
});