import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { PotsFormComponent } from './pots-form/pots-form.component';
import { LucideAngularModule, PiggyBank, FunnelPlus, PlusCircle } from 'lucide-angular';
@Component({
  selector: 'app-pots',
  standalone: true,
  imports: [MatButtonModule, LucideAngularModule, NgFor],
  templateUrl: './pots.component.html',
  styleUrl: './pots.component.scss',
})
export class PotsComponent {
  readonly PiggyBank = PiggyBank;
  readonly FunnelPlus = FunnelPlus;
  readonly PlusCircle = PlusCircle;

  totalSaved = 850;

  pots = [
    { name: 'Savings', value: 150, color: 'border-l-teal-500' },
    { name: 'Gift', value: 40, color: 'border-l-orange-400' },
    { name: 'Concert Ticket', value: 110, color: 'border-l-purple-400' },
    { name: 'New Laptop', value: 10, color: 'border-l-pink-400' },
  ];

  categories = [
    { name: 'Entertainment', color: 'border-b-teal-500' },
    { name: 'Bills', color: 'border-b-orange-400' },
    { name: 'Dining Out', color: 'border-b-purple-400' },
    { name: 'Personal Care', color: 'border-b-pink-400' },
  ];

  constructor(private dialog: MatDialog) {}

  openForm() {
    this.dialog
    .open(PotsFormComponent, {
      width: '700px',
      height: '60vh',
      data: {}
    })
    .afterClosed()
    .subscribe((newPot) => {
      if (newPot) {
        this.pots.push(newPot);
        this.totalSaved += newPot.value;
      }
    });
  }
}
