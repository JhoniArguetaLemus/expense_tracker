import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, Alert, Modal, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useBudget } from '../hooks/useBudget';
import { useTheme } from '../context/ThemeContext';

interface Props {
  total: number;
}

export function BudgetCard({ total }: Props) {
  const { colors } = useTheme();
  const { budget, setBudget, clearBudget } = useBudget();
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const percentage = budget ? Math.min((total / budget) * 100, 100) : 0;
  const remaining = budget ? budget - total : 0;
  const isWarning = percentage >= 80 && percentage < 100;
  const isOver = percentage >= 100;
  const barColor = isOver ? '#EF4444' : isWarning ? '#F59E0B' : colors.primary;

  useEffect(() => {
    if (isWarning && budget) {
      Alert.alert('⚠️ Budget Warning', `You've used ${percentage.toFixed(0)}% of your monthly budget.`, [{ text: 'OK' }]);
    }
  }, [isWarning]);

  const handleSave = () => {
    const parsed = parseFloat(inputValue);
    if (isNaN(parsed) || parsed <= 0) return Alert.alert('Invalid amount', 'Please enter a valid budget.');
    setBudget(parsed);
    setModalVisible(false);
    setInputValue('');
  };

  if (!budget) {
    return (
      <>
        <TouchableOpacity
          style={[styles.setBtn, { backgroundColor: colors.primaryLight, borderColor: colors.border }]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={[styles.setBtnText, { color: colors.primary }]}>💰 Set Monthly Budget</Text>
        </TouchableOpacity>
        <BudgetModal visible={modalVisible} value={inputValue} onChange={setInputValue} onSave={handleSave} onClose={() => setModalVisible(false)} />
      </>
    );
  }

  return (
    <>
      <View style={[styles.card, { backgroundColor: colors.surface, shadowColor: colors.shadow }, isOver && { borderWidth: 1.5, borderColor: '#FCA5A5' }]}>
        <View style={styles.row}>
          <Text style={[styles.label, { color: colors.text }]}>Monthly Budget</Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={[styles.editText, { color: colors.primary }]}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={clearBudget}>
              <Text style={[styles.clearText, { color: colors.danger }]}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.amounts}>
          <View>
            <Text style={[styles.spentLabel, { color: colors.textMuted }]}>Spent</Text>
            <Text style={[styles.spentAmount, { color: barColor }]}>${total.toFixed(2)}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={[styles.spentLabel, { color: colors.textMuted }]}>{isOver ? 'Over by' : 'Remaining'}</Text>
            <Text style={[styles.spentAmount, { color: isOver ? '#EF4444' : '#22C55E' }]}>${Math.abs(remaining).toFixed(2)}</Text>
          </View>
        </View>
        <View style={[styles.barBg, { backgroundColor: colors.primaryLight }]}>
          <View style={[styles.bar, { width: `${percentage}%` as `${number}%`, backgroundColor: barColor }]} />
        </View>
        <View style={styles.row}>
          <Text style={[styles.percentText, { color: colors.textSecondary }]}>{percentage.toFixed(0)}% used</Text>
          <Text style={[styles.budgetTotal, { color: colors.textMuted }]}>of ${budget.toFixed(2)}</Text>
        </View>
      </View>
      <BudgetModal visible={modalVisible} value={inputValue} onChange={setInputValue} onSave={handleSave} onClose={() => setModalVisible(false)} />
    </>
  );
}

function BudgetModal({ visible, value, onChange, onSave, onClose }: {
  visible: boolean; value: string;
  onChange: (v: string) => void; onSave: () => void; onClose: () => void;
}) {
  const { colors } = useTheme();
  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.overlay}>
        <View style={[styles.modal, { backgroundColor: colors.surface }]}>
          <Text style={[styles.modalTitle, { color: colors.text }]}>Set Monthly Budget</Text>
          <Text style={[styles.modalSubtitle, { color: colors.textSecondary }]}>Enter your spending limit for this month</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
            placeholder="e.g. 500.00"
            placeholderTextColor={colors.textMuted}
            keyboardType="decimal-pad"
            value={value}
            onChangeText={onChange}
            autoFocus
          />
          <View style={styles.modalBtns}>
            <TouchableOpacity style={[styles.cancelBtn, { backgroundColor: colors.primaryLight }]} onPress={onClose}>
              <Text style={[styles.cancelText, { color: colors.textSecondary }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.saveBtn, { backgroundColor: colors.primary }]} onPress={onSave}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  setBtn:      { borderRadius: 12, padding: 14, alignItems: 'center', marginBottom: 16, borderWidth: 1.5, borderStyle: 'dashed' },
  setBtnText:  { fontWeight: '700', fontSize: 14 },
  card:        { borderRadius: 16, padding: 16, marginBottom: 16, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 2 },
  row:         { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  label:       { fontSize: 15, fontWeight: '700' },
  actions:     { flexDirection: 'row', gap: 12 },
  editText:    { fontSize: 13, fontWeight: '600' },
  clearText:   { fontSize: 13, fontWeight: '600' },
  amounts:     { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  spentLabel:  { fontSize: 11, marginBottom: 2 },
  spentAmount: { fontSize: 20, fontWeight: '800' },
  barBg:       { borderRadius: 6, height: 10, overflow: 'hidden', marginBottom: 8 },
  bar:         { height: 10, borderRadius: 6 },
  percentText: { fontSize: 12 },
  budgetTotal: { fontSize: 12 },
  overlay:     { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 24 },
  modal:       { borderRadius: 20, padding: 24 },
  modalTitle:    { fontSize: 20, fontWeight: '800', marginBottom: 6 },
  modalSubtitle: { fontSize: 14, marginBottom: 20 },
  input:         { borderRadius: 12, padding: 14, fontSize: 18, borderWidth: 1.5, marginBottom: 20 },
  modalBtns:   { flexDirection: 'row', gap: 12 },
  cancelBtn:   { flex: 1, borderRadius: 12, padding: 14, alignItems: 'center' },
  cancelText:  { fontWeight: '700' },
  saveBtn:     { flex: 1, borderRadius: 12, padding: 14, alignItems: 'center' },
  saveText:    { color: '#fff', fontWeight: '700' },
});