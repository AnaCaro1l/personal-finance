import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from "@angular/router";

interface RecurringBill {
  name: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Unpaid';
  icon: string;
}
@Component({
  selector: 'app-recurring-bills',
  imports: [ NgFor, RouterLink ],
  templateUrl: './recurring-bills.component.html',
  styleUrl: './recurring-bills.component.scss'
})
export class RecurringBillsComponent {
  bills: RecurringBill[] = [
    { name: 'Rent', amount: 1200, dueDate: 'May 25', status: 'Unpaid', icon: '🏠'},
    { name: 'Electricity', amount: 100, dueDate: 'May 20', status: 'Paid', icon: '⚡️'},
    { name: 'Water', amount: 50, dueDate: 'May 15', status: 'Paid', icon: '💧'},
  ];
}
