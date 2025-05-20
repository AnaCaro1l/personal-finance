import { Component } from '@angular/core';
import { LucideAngularModule, CircleUserRound } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TransactionsServiceService, Transaction } from '../../services/transactions-service.service';

@Component({
  selector: 'app-transactions',
  imports: [LucideAngularModule, CommonModule, RouterModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent {
  readonly CircleUserRound = CircleUserRound;

  transactions: Transaction[] = [];

  constructor(private service: TransactionsServiceService) {
    this.transactions = this.service.getTransactions();
  }

  formatAmount(amount: number, toggle: 'Paid' | 'Received'): string {
    const sign = toggle === 'Paid' ? '-' : '+';
    return `${sign}$${amount.toFixed(2)}`;
  }

  get latestTransactions(): Transaction[] {
    return this.transactions
      .slice()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }
}
