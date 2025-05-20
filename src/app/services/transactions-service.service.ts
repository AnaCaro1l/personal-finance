import { Injectable } from '@angular/core';

export interface Transaction {
  name: string;
  amount: number;
  date: string;
  toggle: 'Received' | 'Paid';
}

@Injectable({
  providedIn: 'root',
})
export class TransactionsServiceService {
  private _transactions: Transaction[] = [
    {
      name: 'Emma Richardson',
      amount: 75.5,
      date: '2024-08-19',
      toggle: 'Received',
    },
    {
      name: 'Savory Bites Bistro',
      amount: 55.5,
      date: '2024-08-19',
      toggle: 'Paid',
    },
    {
      name: 'Daniel Carter',
      amount: 42.3,
      date: '2024-08-18',
      toggle: 'Paid',
    },
    {
      name: 'Sun Park',
      amount: 120.0,
      date: '2024-08-17',
      toggle: 'Received',
    },
    {
      name: 'Urban Services Hub',
      amount: 65.0,
      date: '2024-08-17',
      toggle: 'Paid',
    },
  ];

  getTransactions(): Transaction[] {
    return [...this._transactions];
  }

  addTransaction(tx: Transaction): void {
    this._transactions.push(tx);
  }

  updateTransaction(index: number, tx: Transaction): void {
    if (this._transactions[index]) {
      this._transactions[index] = tx;
    }
  }
  removeTransaction(index: number): void {
    if (index >= 0 && index < this._transactions.length) {
      this._transactions.splice(index, 1);
    }
  }

  transactionsByMonth(month: string): Transaction[] {
    return this._transactions.filter((tx) => tx.date.startsWith(month));
  }

  get totalReceived(): number {
    return this._transactions
      .filter((tx) => tx.toggle === 'Received')
      .reduce((sum, tx) => sum + tx.amount, 0);
  }

  get totalPaid(): number {
    return this._transactions
      .filter((tx) => tx.toggle === 'Paid')
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  }

  get balance(): number {
    return this.totalReceived - this.totalPaid;
  }
}
