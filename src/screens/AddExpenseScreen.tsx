import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, ScrollView, Alert,
} from 'react-native';
import { Category, CATEGORIES } from '../types';
import { useExpenses } from '../hooks/useExpenses';
import { useTheme } from '../context/ThemeContext';

interface Props {
  onBack: () => void;
  addExpense: ReturnType<typeof useExpenses>['addExpense'];
}

export function AddExpenseScreen({ onBack, addExpense }: Props) {
  const { colors } = useTheme();
  const [title, setTitle]       = useState('');
  const [amount, setAmount]     = useState('');
  const [category, setCategory] = useState<Category>('other');

  const handleSave = () => {
    if (!title.trim()) return Alert.alert('Missing field', 'Please enter a title.');
    const parsed = parseFloat(amount);
    if (isNaN(parsed) || parsed <= 0) return Alert.alert('Invalid amount', 'Enter a valid amount.');
    addExpense({ title: title.trim(), amount: parsed, category });
    onBack();
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Text style={[styles.backText, { color: colors.primary }]}>← Back</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>New Expense</Text>
          <View style={{ width: 60 }} />
        </View>

        <Text style={[styles.label, { color: colors.textSecondary }]}>Title</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
          placeholder="e.g. Lunch, Uber..."
          placeholderTextColor={colors.textMuted}
          value={title}
          onChangeText={setTitle}
        />

        <Text style={[styles.label, { color: colors.textSecondary }]}>Amount ($)</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.surface, color: colors.text, borderColor: colors.border }]}
          placeholder="0.00"
          placeholderTextColor={colors.textMuted}
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={setAmount}
        />

        <Text style={[styles.label, { color: colors.textSecondary }]}>Category</Text>
        <View style={styles.categories}>
          {(Object.entries(CATEGORIES) as [Category, typeof CATEGORIES[Category]][]).map(([key, cat]) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.catBtn,
                { backgroundColor: colors.surface, borderColor: colors.border },
                category === key && { backgroundColor: cat.color, borderColor: cat.color },
              ]}
              onPress={() => setCategory(key)}
            >
              <Text style={styles.catEmoji}>{cat.emoji}</Text>
              <Text style={[styles.catLabel, { color: colors.textSecondary }, category === key && { color: '#fff' }]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={[styles.saveBtn, { backgroundColor: colors.primary }]} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save Expense</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:        { flex: 1 },
  container:   { padding: 20 },
  header:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 },
  backBtn:     { width: 60 },
  backText:    { fontSize: 15, fontWeight: '600' },
  headerTitle: { fontSize: 20, fontWeight: '800' },
  label:       { fontSize: 13, fontWeight: '600', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  input:       { borderRadius: 12, padding: 14, fontSize: 16, marginBottom: 20, borderWidth: 1.5 },
  categories:  { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 32 },
  catBtn:      { borderRadius: 12, paddingVertical: 10, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1.5 },
  catEmoji:    { fontSize: 18 },
  catLabel:    { fontSize: 13, fontWeight: '600' },
  saveBtn:     { borderRadius: 14, padding: 16, alignItems: 'center' },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '800' },
});