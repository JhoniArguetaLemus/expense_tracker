import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Modal, FlatList, SafeAreaView,
} from 'react-native';
import { CURRENCIES, Currency } from '../types';
import { useCurrencyContext } from '../context/CurrencyContext';
import { useTheme } from '../context/ThemeContext';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export function CurrencyPicker({ visible, onClose }: Props) {
  const { colors } = useTheme();
  const { currency, setCurrency } = useCurrencyContext();

  const handleSelect = (c: Currency) => {
    setCurrency(c);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={[styles.modal, { backgroundColor: colors.background }]}>
        <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
          <Text style={[styles.modalTitle, { color: colors.text }]}>Select Currency</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={[styles.closeBtn, { color: colors.primary }]}>Done</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={CURRENCIES}
          keyExtractor={item => item.code}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.item,
                { backgroundColor: colors.surface, borderColor: colors.border },
                item.code === currency.code && { borderColor: colors.primary, borderWidth: 2 },
              ]}
              onPress={() => handleSelect(item)}
            >
              <Text style={styles.itemFlag}>{item.flag}</Text>
              <View style={styles.itemInfo}>
                <Text style={[styles.itemCode, { color: colors.text }]}>{item.code}</Text>
                <Text style={[styles.itemLabel, { color: colors.textSecondary }]}>{item.label}</Text>
              </View>
              <Text style={[styles.itemSymbol, { color: colors.primary }]}>{item.symbol}</Text>
              {item.code === currency.code && (
                <Text style={[styles.check, { color: colors.primary }]}>✓</Text>
              )}
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal:       { flex: 1 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1 },
  modalTitle:  { fontSize: 20, fontWeight: '800' },
  closeBtn:    { fontSize: 16, fontWeight: '600' },
  list:        { padding: 16, gap: 10 },
  item:        { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, borderWidth: 1.5, gap: 12 },
  itemFlag:    { fontSize: 28 },
  itemInfo:    { flex: 1 },
  itemCode:    { fontSize: 15, fontWeight: '700' },
  itemLabel:   { fontSize: 12, marginTop: 2 },
  itemSymbol:  { fontSize: 18, fontWeight: '800' },
  check:       { fontSize: 18, fontWeight: '800' },
});