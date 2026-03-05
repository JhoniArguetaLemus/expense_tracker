import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, Alert, Modal, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useBudget } from '../hooks/useBudget';

interface Props {
  total: number; // total spent this month
}

export function BudgetCard({ total }: Props) {
  const { budget, setBudget, clearBudget } = useBudget();
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const percentage = budget ? Math.min((total / budget) * 100, 100) : 0;
  const remaining = budget ? budget - total : 0;
  const isWarning = percentage >= 80 && percentage < 100;
  const isOver = percentage >= 100;

  const barColor = isOver ? '#EF4444' : isWarning ? '#F59E0B' : '#38BDF8';

  useEffect(() => {
    if (isWarning && budget) {
      Alert.alert(
        '⚠️ Budget Warning',
        `You've used ${percentage.toFixed(0)}% of your monthly budget.`,
        [{ text: 'OK' }]
      );
    }
  }, [isWarning]);

  const handleSave = () => {
    const parsed = parseFloat(inputValue);
    if (isNaN(parsed) || parsed <= 0) {
      Alert.alert('Invalid amount', 'Please enter a valid budget.');
      return;
    }
    setBudget(parsed);
    setModalVisible(false);
    setInputValue('');
  };

  if (!budget) {
    return (
      <>
        <TouchableOpacity style={styles.setBtn} onPress={() => setModalVisible(true)}>
          <Text style={styles.setBtnText}>💰 Set Monthly Budget</Text>
        </TouchableOpacity>
        <BudgetModal
          visible={modalVisible}
          value={inputValue}
          onChange={setInputValue}
          onSave={handleSave}
          onClose={() => setModalVisible(false)}
        />
      </>
    );
  }

  return (
    <>
      <View style={[styles.card, isOver && styles.cardOver]}>
        <View style={styles.row}>
          <Text style={styles.label}>Monthly Budget</Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={clearBudget}>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.amounts}>
          <View>
            <Text style={styles.spentLabel}>Spent</Text>
            <Text style={[styles.spentAmount, { color: barColor }]}>${total.toFixed(2)}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.spentLabel}>{isOver ? 'Over by' : 'Remaining'}</Text>
            <Text style={[styles.spentAmount, { color: isOver ? '#EF4444' : '#22C55E' }]}>
              ${Math.abs(remaining).toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Progress bar */}
        <View style={styles.barBg}>
          <View style={[styles.bar, { width: `${percentage}%` as `${number}%`, backgroundColor: barColor }]} />
        </View>

        <View style={styles.row}>
          <Text style={styles.percentText}>{percentage.toFixed(0)}% used</Text>
          <Text style={styles.budgetTotal}>of ${budget.toFixed(2)}</Text>
        </View>
      </View>

      <BudgetModal
        visible={modalVisible}
        value={inputValue}
        onChange={setInputValue}
        onSave={handleSave}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}

function BudgetModal({ visible, value, onChange, onSave, onClose }: {
  visible: boolean;
  value: string;
  onChange: (v: string) => void;
  onSave: () => void;
  onClose: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Set Monthly Budget</Text>
          <Text style={styles.modalSubtitle}>Enter your spending limit for this month</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 500.00"
            placeholderTextColor="#94A3B8"
            keyboardType="decimal-pad"
            value={value}
            onChangeText={onChange}
            autoFocus
          />
          <View style={styles.modalBtns}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  setBtn: {
    backgroundColor: '#E0F2FE',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#BAE6FD',
    borderStyle: 'dashed',
  },
  setBtnText: { color: '#0EA5E9', fontWeight: '700', fontSize: 14 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  cardOver: { borderWidth: 1.5, borderColor: '#FCA5A5' },
  row:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  label:  { color: '#0C1A2E', fontSize: 15, fontWeight: '700' },
  actions:{ flexDirection: 'row', gap: 12 },
  editText:  { color: '#38BDF8', fontSize: 13, fontWeight: '600' },
  clearText: { color: '#EF4444', fontSize: 13, fontWeight: '600' },
  amounts:   { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  spentLabel:  { color: '#94A3B8', fontSize: 11, marginBottom: 2 },
  spentAmount: { fontSize: 20, fontWeight: '800' },
  barBg: { backgroundColor: '#E0F2FE', borderRadius: 6, height: 10, overflow: 'hidden', marginBottom: 8 },
  bar:   { height: 10, borderRadius: 6 },
  percentText: { color: '#64748B', fontSize: 12 },
  budgetTotal: { color: '#94A3B8', fontSize: 12 },
  // Modal
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', padding: 24 },
  modal:   { backgroundColor: '#fff', borderRadius: 20, padding: 24 },
  modalTitle:    { color: '#0C1A2E', fontSize: 20, fontWeight: '800', marginBottom: 6 },
  modalSubtitle: { color: '#64748B', fontSize: 14, marginBottom: 20 },
  input: {
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 14,
    color: '#0C1A2E',
    fontSize: 18,
    borderWidth: 1.5,
    borderColor: '#BAE6FD',
    marginBottom: 20,
  },
  modalBtns:  { flexDirection: 'row', gap: 12 },
  cancelBtn:  { flex: 1, backgroundColor: '#F1F5F9', borderRadius: 12, padding: 14, alignItems: 'center' },
  cancelText: { color: '#64748B', fontWeight: '700' },
  saveBtn:    { flex: 1, backgroundColor: '#38BDF8', borderRadius: 12, padding: 14, alignItems: 'center' },
  saveText:   { color: '#fff', fontWeight: '700' },
});