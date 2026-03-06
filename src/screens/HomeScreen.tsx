import React from 'react';
import {
  View, Text, FlatList, StyleSheet,
  SafeAreaView, ActivityIndicator, TouchableOpacity,
} from 'react-native';
import { Expense } from '../types';
import { ExpenseCard } from '../components/ExpenseCard';
import { CategorySummary } from '../components/CategorySummary';
import { BudgetCard } from '../components/BudgetCard';
import { useTheme } from '../context/ThemeContext';

interface Props {
  onAddPress: () => void;
  expenses: Expense[];
  loading: boolean;
  deleteExpense: (id: string) => void;
  total: number;
}

export function HomeScreen({ onAddPress, expenses, loading, deleteExpense, total }: Props) {
  const { colors, toggleTheme, isDark } = useTheme();

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: colors.text }]}>My Expenses</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{expenses.length} transactions</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={[styles.themeBtn, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={toggleTheme}>
            <Text style={styles.themeEmoji}>{isDark ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.primary }]} onPress={onAddPress}>
            <Text style={styles.addBtnText}>+ Add</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.totalCard, { backgroundColor: colors.primary }]}>
        <Text style={styles.totalLabel}>Total Spent</Text>
        <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
      </View>

      <FlatList
        data={expenses}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <BudgetCard total={total} />
            <CategorySummary expenses={expenses} />
          </>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>💸</Text>
            <Text style={[styles.emptyText, { color: colors.text }]}>No expenses yet</Text>
            <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>Tap "+ Add" to get started</Text>
          </View>
        }
        renderItem={({ item }) => (
          <ExpenseCard expense={item} onDelete={deleteExpense} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:          { flex: 1 },
  centered:      { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  greeting:      { fontSize: 24, fontWeight: '800' },
  subtitle:      { fontSize: 13, marginTop: 2 },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  themeBtn:      { borderRadius: 10, padding: 8, borderWidth: 1.5 },
  themeEmoji:    { fontSize: 16 },
  addBtn:        { borderRadius: 12, paddingHorizontal: 18, paddingVertical: 10 },
  addBtnText:    { color: '#fff', fontWeight: '700', fontSize: 15 },
  totalCard:     { borderRadius: 20, marginHorizontal: 20, marginBottom: 20, padding: 24 },
  totalLabel:    { color: 'rgba(255,255,255,0.85)', fontSize: 14 },
  totalAmount:   { color: '#fff', fontSize: 40, fontWeight: '800', marginTop: 4 },
  list:          { paddingHorizontal: 20, paddingBottom: 40 },
  empty:         { alignItems: 'center', marginTop: 40 },
  emptyEmoji:    { fontSize: 48, marginBottom: 10 },
  emptyText:     { fontSize: 18, fontWeight: '600' },
  emptySubtext:  { fontSize: 14, marginTop: 4 },
});