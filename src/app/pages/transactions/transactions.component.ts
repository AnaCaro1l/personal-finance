import { Component } from '@angular/core';
import { LucideAngularModule, UsersRound, BanknoteArrowUp, BanknoteArrowDown, CircleDollarSign, FunnelPlus } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

interface Transaction {
  name: string;
  amount: number;
  date: string;
}

@Component({
  selector: 'app-transactions',
  imports: [
    CommonModule,
    LucideAngularModule,
    MatButtonModule
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {
  readonly UsersRound = UsersRound;
  readonly BanknoteArrowUp = BanknoteArrowUp;
  readonly BanknoteArrowDown = BanknoteArrowDown;
  readonly CircleDollarSign = CircleDollarSign;
  readonly FunnelPlus = FunnelPlus;

  formatAmount(amount: number): string {
    return `${amount > 0 ? '+' : '-'}$${Math.abs(amount).toFixed(2)}`;
  }

  transactions: Transaction[] = [
    {
      name: 'Emma Richardson',
      amount: 75.5,
      date: '19 Aug 2024',
    },
    {
      name: 'Savory Bites Bistro',
      amount: -55.5,
      date: '19 Aug 2024',
    },
    {
      name: 'Daniel Carter',
      amount: -42.3,
      date: '18 Aug 2024',
    },
    {
      name: 'Sun Park',
      amount: 120.0,
      date: '17 Aug 2024',
    },
    {
      name: 'Urban Services Hub',
      amount: -65.0,
      date: '17 Aug 2024',
    },
  ];

  openForm() {}
}
