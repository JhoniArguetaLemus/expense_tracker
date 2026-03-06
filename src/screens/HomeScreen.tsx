import React, { useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, SafeAreaView,
  ActivityIndicator, TouchableOpacity, Alert, Modal,
} from 'react-native';
import { Expense } from '../types';
import { ExpenseCard } from '../components/ExpenseCard';
import { CategorySummary } from '../components/CategorySummary';
import { BudgetCard } from '../components/BudgetCard';
import { ExpenseChart } from '../components/ExpenseChart';
import { CurrencyPicker } from '../components/CurrencyPicker';
import { useTheme } from '../context/ThemeContext';
import { useCurrencyContext } from '../context/CurrencyContext';
import { exportToCSV } from '../utils/exportCSV';

interface Props {
  onAddPress: () => void;
  expenses: Expense[];
  loading: boolean;
  deleteExpense: (id: string) => void;
  total: number;
}

export function HomeScreen({ onAddPress, expenses, loading, deleteExpense, total }: Props) {
  const { colors, toggleTheme, isDark } = useTheme();
  const { format } = useCurrencyContext();
  const [menuVisible, setMenuVisible] = useState(false);
  const [currencyVisible, setCurrencyVisible] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setMenuVisible(false);
    if (expenses.length === 0) {
      Alert.alert('No data', 'Add some expenses before exporting.');
      return;
    }
    try {
      setExporting(true);
      await exportToCSV(expenses);
    } catch (e: any) {
      Alert.alert('Export failed', e.message);
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: colors.text }]}>My Expenses</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{expenses.length} transactions</Text>
        </View>
        <View style={styles.headerActions}>
          {/* Menu button */}
          <TouchableOpacity
            style={[styles.iconBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => setMenuVisible(true)}
          >
            <Text style={styles.iconEmoji}>⋯</Text>
          </TouchableOpacity>

          {/* Add button */}
          <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.primary }]} onPress={onAddPress}>
            <Text style={styles.addBtnText}>+ Add</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Dropdown Menu Modal */}
      <Modal visible={menuVisible} transparent animationType="fade">
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setMenuVisible(false)}>
          <View style={[styles.menu, { backgroundColor: colors.surface, borderColor: colors.border }]}>

            {/* Currency */}
            <TouchableOpacity
              style={[styles.menuItem, { borderBottomColor: colors.border }]}
              onPress={() => { setMenuVisible(false); setCurrencyVisible(true); }}
            >
              <Text style={styles.menuEmoji}>💱</Text>
              <Text style={[styles.menuText, { color: colors.text }]}>Currency</Text>
              <Text style={[styles.menuValue, { color: colors.textMuted }]}>USD</Text>
            </TouchableOpacity>

            {/* Dark / Light mode */}
            <TouchableOpacity
              style={[styles.menuItem, { borderBottomColor: colors.border }]}
              onPress={() => { toggleTheme(); setMenuVisible(false); }}
            >
              <Text style={styles.menuEmoji}>{isDark ? '☀️' : '🌙'}</Text>
              <Text style={[styles.menuText, { color: colors.text }]}>{isDark ? 'Light Mode' : 'Dark Mode'}</Text>
            </TouchableOpacity>

            {/* Export CSV */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleExport}
              disabled={exporting}
            >
              <Text style={styles.menuEmoji}>{exporting ? '⏳' : '📤'}</Text>
              <Text style={[styles.menuText, { color: colors.text }]}>Export to CSV</Text>
            </TouchableOpacity>

          </View>
        </TouchableOpacity>
      </Modal>

      {/* Currency Picker Modal */}
      <CurrencyPicker visible={currencyVisible} onClose={() => setCurrencyVisible(false)} />

      {/* Total Card */}
      <View style={[styles.totalCard, { backgroundColor: colors.primary }]}>
        <Text style={styles.totalLabel}>Total Spent</Text>
        <Text style={styles.totalAmount}>{format(total)}</Text>
      </View>

      <FlatList
        data={expenses}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <BudgetCard total={total} />
            <ExpenseChart expenses={expenses} />
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
  iconBtn:       { borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1.5 },
  iconEmoji:     { fontSize: 18, fontWeight: '800' },
  addBtn:        { borderRadius: 12, paddingHorizontal: 18, paddingVertical: 10 },
  addBtnText:    { color: '#fff', fontWeight: '700', fontSize: 15 },
  // Dropdown menu
  overlay:   { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' },
  menu:      {
    position: 'absolute', top: 80, right: 20,
    borderRadius: 14, borderWidth: 1, minWidth: 200,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12, shadowRadius: 12, elevation: 8,
  },
  menuItem:  { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12, borderBottomWidth: 1 },
  menuEmoji: { fontSize: 18 },
  menuText:  { flex: 1, fontSize: 15, fontWeight: '600' },
  menuValue: { fontSize: 13 },
  // Total
  totalCard:    { borderRadius: 20, marginHorizontal: 20, marginBottom: 20, padding: 24 },
  totalLabel:   { color: 'rgba(255,255,255,0.85)', fontSize: 14 },
  totalAmount:  { color: '#fff', fontSize: 40, fontWeight: '800', marginTop: 4 },
  list:         { paddingHorizontal: 20, paddingBottom: 40 },
  empty:        { alignItems: 'center', marginTop: 40 },
  emptyEmoji:   { fontSize: 48, marginBottom: 10 },
  emptyText:    { fontSize: 18, fontWeight: '600' },
  emptySubtext: { fontSize: 14, marginTop: 4 },
});