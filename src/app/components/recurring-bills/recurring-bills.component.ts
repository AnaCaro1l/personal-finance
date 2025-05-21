import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  BillsServiceService,
  RecurringBill,
} from '../../services/bills-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recurring-bills',
  imports: [NgFor, RouterLink, CommonModule],
  templateUrl: './recurring-bills.component.html',
  styleUrl: './recurring-bills.component.scss',
})
export class RecurringBillsComponent {
  bills: RecurringBill[] = [];

  constructor(private service: BillsServiceService) {
    this.bills = this.service.getBills();
  }

  get latestBills(): RecurringBill[] {
    return this.bills
      .slice()
      .sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(a.dueDate).getTime()
      )
      .slice(0, 5);
  }
}
