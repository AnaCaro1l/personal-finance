import { Component } from '@angular/core';
import {
  LucideAngularModule,
  FunnelPlus,
  Plus,
  BanknoteArrowDown,
  CircleCheckBig,
  CircleX,
  Receipt,
  EllipsisVertical,
} from 'lucide-angular';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { BillFormComponent } from './bills-form/bill-form.component';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import {
  BillsServiceService,
  RecurringBill,
} from '../../services/bills-service.service';
import { MatMenuModule } from '@angular/material/menu';



@Component({
  selector: 'app-recurring-bills',
  imports: [
    LucideAngularModule,
    NgFor,
    MatButtonModule,
    NgIf,
    CommonModule,
    MatMenuModule,
  ],
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
  readonly EllipsisVertical = EllipsisVertical;

  bills: RecurringBill[] = [];

  constructor(
    private dialog: MatDialog,
    private billsService: BillsServiceService
  ) {
    this.bills = this.billsService.getBills();
  }

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
    return this.billsService.totalBills;
  }

  editBill(index: number) {
    const bill = this.bills[index];
    this.dialog
      .open(BillFormComponent, {
        width: '500px',
        height: 'auto',
        data: bill,
      })
      .afterClosed()
      .subscribe((updatedBill: RecurringBill | null) => {
        if (updatedBill) {
          this.billsService.updateBill(index, updatedBill);
          this.bills = this.billsService.getBills();
        }
      });
  }

  deleteBill(index: number) {
    this.billsService.removeBill(index);
    this.bills = this.billsService.getBills();
  }
}
