import { Component } from '@angular/core';
import { BillsServiceService } from '../../services/bills-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary-cards',
  imports: [
    CommonModule,
  ],
  templateUrl: './summary-cards.component.html',
  styleUrl: './summary-cards.component.scss'
})
export class SummaryCardsComponent {
  user: any;
  expenses: number = 0;
  constructor(private service: BillsServiceService) {
    this.expenses = this.service.totalBills;
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }
}
