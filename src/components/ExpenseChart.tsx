import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Expense, CATEGORIES, Category } from '../types';
import { useTheme } from '../context/ThemeContext';

interface Props {
  expenses: Expense[];
}

const SCREEN_WIDTH = Dimensions.get('window').width - 40;

export function ExpenseChart({ expenses }: Props) {
  const { colors } = useTheme();

  if (expenses.length === 0) return null;

  const totals = expenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  const pieData = Object.entries(totals).map(([cat, amount]) => ({
    name: CATEGORIES[cat as Category].label,
    amount,
    color: CATEGORIES[cat as Category].color,
    legendFontColor: colors.textSecondary,
    legendFontSize: 12,
  }));

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}>
      <Text style={[styles.title, { color: colors.text }]}>Spending Chart</Text>
      <PieChart
        data={pieData}
        width={SCREEN_WIDTH}
        height={200}
        chartConfig={{
          color: (opacity = 1) => `rgba(56, 189, 248, ${opacity})`,
          labelColor: () => colors.text,
          backgroundColor: colors.surface,
          backgroundGradientFrom: colors.surface,
          backgroundGradientTo: colors.surface,
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="10"
        absolute
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16, padding: 16, marginBottom: 20,
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 2,
  },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
});