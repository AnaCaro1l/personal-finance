import { Injectable } from '@angular/core';

export interface RecurringBill {
  name: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Unpaid';
  icon: string;
}
@Injectable({
  providedIn: 'root',
})
export class BillsServiceService {
  private bills: RecurringBill[] = [
    {
      name: 'Rent',
      amount: 1200,
      dueDate: '2025-05-24',
      status: 'Unpaid',
      icon: '🏠',
    },
    {
      name: 'Electricity',
      amount: 100,
      dueDate: '2025-05-05',
      status: 'Paid',
      icon: '⚡️',
    },
    {
      name: 'Water',
      amount: 50,
      dueDate: '2025-05-10',
      status: 'Paid',
      icon: '💧',
    },
  ];

  getBills(): RecurringBill[] {
    return [...this.bills];
  }

  addBill(bill: RecurringBill) {
    this.bills.push(bill);
  }

  removeBill(index: number): void {
    if (index >= 0 && index < this.bills.length) {
      this.bills.splice(index, 1);
    }
  }

  updateBill(index: number, bill: RecurringBill) {
    if (this.bills[index]) {
      this.bills[index] = bill;
    }
  }

  get totalBills(): number {
    return this.bills.reduce((sum, bill) => sum + bill.amount, 0);
  }

  get latestBills(): RecurringBill[] {
    return this.bills.slice(0, 3);
  }
}
