import React from 'react';
import {
  View, Text, FlatList, StyleSheet,
  SafeAreaView, ActivityIndicator, TouchableOpacity,
} from 'react-native';
import { Expense } from '../types';
import { ExpenseCard } from '../components/ExpenseCard';
import { CategorySummary } from '../components/CategorySummary';
import { BudgetCard } from '../components/BudgetCard';

interface Props {
  onAddPress: () => void;
  expenses: Expense[];
  loading: boolean;
  deleteExpense: (id: string) => void;
  total: number;
}

export function HomeScreen({ onAddPress, expenses, loading, deleteExpense, total }: Props) {

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color="#A855F7" size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>My Expenses</Text>
          <Text style={styles.subtitle}>{expenses.length} transactions</Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={onAddPress}>
          <Text style={styles.addBtnText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {/* Total Card */}
      <View style={styles.totalCard}>
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
            <Text style={styles.emptyText}>No expenses yet</Text>
            <Text style={styles.emptySubtext}>Tap "+ Add" to get started</Text>
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
  safe:        { flex: 1, backgroundColor: '#F0F9FF' },
  centered:    { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F0F9FF' },
  header:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  greeting:    { color: '#0C1A2E', fontSize: 24, fontWeight: '800' },
  subtitle:    { color: '#64748B', fontSize: 13, marginTop: 2 },
  addBtn:      { backgroundColor: '#38BDF8', borderRadius: 12, paddingHorizontal: 18, paddingVertical: 10 },
  addBtnText:  { color: '#fff', fontWeight: '700', fontSize: 15 },
  totalCard:   {
    backgroundColor: '#38BDF8',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 24,
  },
  totalLabel:  { color: 'rgba(255,255,255,0.85)', fontSize: 14 },
  totalAmount: { color: '#fff', fontSize: 40, fontWeight: '800', marginTop: 4 },
  list:        { paddingHorizontal: 20, paddingBottom: 40 },
  empty:       { alignItems: 'center', marginTop: 40 },
  emptyEmoji:  { fontSize: 48, marginBottom: 10 },
  emptyText:   { color: '#0C1A2E', fontSize: 18, fontWeight: '600' },
  emptySubtext:{ color: '#64748B', fontSize: 14, marginTop: 4 },
});