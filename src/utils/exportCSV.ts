import * as Sharing from 'expo-sharing';
import { File, Paths } from 'expo-file-system/next';
import { Expense, CATEGORIES } from '../types';

export async function exportToCSV(expenses: Expense[]): Promise<void> {
  if (expenses.length === 0) {
    throw new Error('No expenses to export.');
  }

  const headers = ['Date', 'Title', 'Category', 'Amount'];
  const rows = expenses.map(e => {
    const date = new Date(e.date).toLocaleDateString('en-US');
    const category = CATEGORIES[e.category].label;
    const amount = e.amount.toFixed(2);
    return [date, `"${e.title}"`, category, amount].join(',');
  });

  const csv = [headers.join(','), ...rows].join('\n');
  const filename = `expenses_${new Date().toISOString().split('T')[0]}.csv`;

  const file = new File(Paths.cache, filename);
  file.write(csv);

  const canShare = await Sharing.isAvailableAsync();
  if (!canShare) {
    throw new Error('Sharing is not available on this device.');
  }

  await Sharing.shareAsync(file.uri, {
    mimeType: 'text/csv',
    dialogTitle: 'Export Expenses',
    UTI: 'public.comma-separated-values-text',
  });
}