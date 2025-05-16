import { Component } from '@angular/core';
import {
  LucideAngularModule,
  FunnelPlus,
  Plus,
  BanknoteArrowDown,
  CircleCheckBig,
  CircleX,
  Receipt,
} from 'lucide-angular';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { BillFormComponent } from './bills-form/bill-form.component';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

interface RecurringBill {
  name: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Unpaid';
  icon: string;
}

@Component({
  selector: 'app-recurring-bills',
  imports: [LucideAngularModule, NgFor, MatButtonModule, NgIf, CommonModule],
  templateUrl: './recurring-bills.component.html',
  styleUrl: './recurring-bills.component.scss',
})
export class RecurringBillsComponent {
  readonly FunnelPlus = FunnelPlus;
  readonly Plus = Plus;
  readonly Banknote = BanknoteArrowDown;
  readonly CircleCheckBig = CircleCheckBig;
  readonly CircleX = CircleX;
  readonly Receipt = Receipt;

  bills: RecurringBill[] = [
    {
      name: 'Rent',
      amount: 1200,
      dueDate: 'May 25',
      status: 'Unpaid',
      icon: '🏠',
    },
    {
      name: 'Electricity',
      amount: 100,
      dueDate: 'May 20',
      status: 'Paid',
      icon: '⚡️',
    },
    {
      name: 'Water',
      amount: 50,
      dueDate: 'May 15',
      status: 'Paid',
      icon: '💧',
    },
  ];

  constructor(private dialog: MatDialog) {}

  openForm() {
    this.dialog
      .open(BillFormComponent, {
        width: '500px',
        height: 'auto',
      })
      .afterClosed()
      .subscribe((newBill) => {
        if (newBill) {
          this.bills.push(newBill);
        }
      });
  }

  get paidBills() {
    return this.bills.filter((bill) => bill.status === 'Paid');
  }

  get unpaidBills() {
    return this.bills.filter((bill) => bill.status === 'Unpaid');
  }

  getTotalBills(): number {
    return this.bills.reduce((sum, bill) => sum + bill.amount, 0);
  }
}
