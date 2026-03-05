import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, ScrollView, Alert,
} from 'react-native';
import { Category, CATEGORIES } from '../types';
import { useExpenses } from '../hooks/useExpenses';

interface Props {
  onBack: () => void;
  addExpense: ReturnType<typeof useExpenses>['addExpense'];
}

export function AddExpenseScreen({ onBack, addExpense }: Props) {
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
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Expense</Text>
          <View style={{ width: 60 }} />
        </View>

        {/* Title */}
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Lunch, Uber..."
          placeholderTextColor="#6B7280"
          value={title}
          onChangeText={setTitle}
        />

        {/* Amount */}
        <Text style={styles.label}>Amount ($)</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          placeholderTextColor="#6B7280"
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={setAmount}
        />

        {/* Category */}
        <Text style={styles.label}>Category</Text>
        <View style={styles.categories}>
          {(Object.entries(CATEGORIES) as [Category, typeof CATEGORIES[Category]][]).map(([key, cat]) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.catBtn,
                category === key && { backgroundColor: cat.color, borderColor: cat.color },
              ]}
              onPress={() => setCategory(key)}
            >
              <Text style={styles.catEmoji}>{cat.emoji}</Text>
              <Text style={[styles.catLabel, category === key && { color: '#fff' }]}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Save */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save Expense</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:        { flex: 1, backgroundColor: '#F0F9FF' },
  container:   { padding: 20 },
  header:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 },
  backBtn:     { width: 60 },
  backText:    { color: '#38BDF8', fontSize: 15, fontWeight: '600' },
  headerTitle: { color: '#0C1A2E', fontSize: 20, fontWeight: '800' },
  label:       { color: '#64748B', fontSize: 13, fontWeight: '600', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  input:       {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    color: '#0C1A2E',
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: '#BAE6FD',
  },
  categories:  { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 32 },
  catBtn:      {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: '#BAE6FD',
  },
  catEmoji:    { fontSize: 18 },
  catLabel:    { color: '#64748B', fontSize: 13, fontWeight: '600' },
  saveBtn:     { backgroundColor: '#38BDF8', borderRadius: 14, padding: 16, alignItems: 'center' },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '800' },
});