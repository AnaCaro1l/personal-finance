import { Component, OnInit } from '@angular/core';
import { LucideAngularModule, CircleUserRound, LogOut, UserRoundPen, Receipt } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TransactionsServiceService, Transaction } from '../../services/transactions-service.service';
import { PotsServiceService, Pots } from '../../services/pots-service.service';
import { BillsServiceService, RecurringBill } from '../../services/bills-service.service';

@Component({
  selector: 'app-profile',
  imports: [ LucideAngularModule, CommonModule ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  readonly CircleUserRound = CircleUserRound;
  readonly LogOut = LogOut;
  readonly UserRoundPen = UserRoundPen;
  readonly Receipt = Receipt;

  user: any;

  transactions: Transaction[] = [];
  pots: Pots[] = [];
  bills: RecurringBill[] = [];

  constructor(
    private router: Router,
    private transactionService: TransactionsServiceService,
    private potsService: PotsServiceService,
    private billsService: BillsServiceService
  ) {
    this.transactions = this.transactionService.getTransactions();
    this.pots = this.potsService.getPots();
    this.bills = this.billsService.getBills();
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  formatAmount(amount: number, toggle: 'Paid' | 'Received'): string {
    const sign = toggle === 'Paid' ? '-' : '+';
    return `${sign}$${amount.toFixed(2)}`;
  }

  logout(): void {
    localStorage.removeItem('auth');
    this.router.navigate(['/login']);
  }

  editUser(): void {
    this.router.navigate(['/register'], { state: { user: this.user } });
  }

  get latestTransactions(): Transaction[] {
    return this.transactions
      .slice()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  }

  get biggestPots(): Pots[] {
    return this.pots
      .slice()
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 2);
  }

  get latestBills(): RecurringBill[] {
    return this.bills
      .slice()
      .sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(a.dueDate).getTime()
      )
      .slice(0, 2);
  }
}
