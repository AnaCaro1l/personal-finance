import { Component } from '@angular/core';
import {
  LucideAngularModule,
  UsersRound,
  BanknoteArrowUp,
  BanknoteArrowDown,
  CircleDollarSign,
  FunnelPlus,
  EllipsisVertical,
} from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TransactionsFormComponent } from './transactions-form/transactions-form.component';
import { TransactionsServiceService } from '../../services/transactions-service.service';
import { MatMenuModule } from '@angular/material/menu';

interface Transaction {
  name: string;
  amount: number;
  date: string;
  toggle: 'Received' | 'Paid';
}

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, MatButtonModule, MatMenuModule],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent {
  readonly UsersRound = UsersRound;
  readonly BanknoteArrowUp = BanknoteArrowUp;
  readonly BanknoteArrowDown = BanknoteArrowDown;
  readonly CircleDollarSign = CircleDollarSign;
  readonly FunnelPlus = FunnelPlus;
  readonly EllipsisVertical = EllipsisVertical;

  transactions: Transaction[];

  constructor(
    private dialog: MatDialog,
    private service: TransactionsServiceService
  ) {
    this.transactions = this.service.getTransactions();
  }

  formatAmount(amount: number, toggle: 'Paid' | 'Received'): string {
    const sign = toggle === 'Paid' ? '-' : '+';
    return `${sign}$${amount.toFixed(2)}`;
  }

  openForm() {
    this.dialog
      .open(TransactionsFormComponent, {
        width: '500px',
      })
      .afterClosed()
      .subscribe((newTransaction: Transaction | null) => {
        if (newTransaction) {
          this.service.addTransaction(newTransaction);
          this.transactions = this.service.getTransactions();
        }
      });
  }

  editTransaction(index: number) {
    const transaction = this.transactions[index];
    this.dialog
      .open(TransactionsFormComponent, {
        width: '500px',
        data: transaction,
      })
      .afterClosed()
      .subscribe((updatedTransaction: Transaction | null) => {
        if (updatedTransaction) {
          this.service.updateTransaction(index, updatedTransaction);
          this.transactions = this.service.getTransactions();
        }
      });
  }

  deleteTransaction(index: number) {
    this.service.removeTransaction(index);
    this.transactions = this.service.getTransactions();
  }

  get totalReceived(): number {
    return this.service.totalReceived;
  }

  get totalPaid(): number {
    return this.service.totalPaid;
  }

  get balance(): number {
    return this.service.balance;
  }
}
