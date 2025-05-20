import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { PotsFormComponent } from './pots-form/pots-form.component';
import {
  LucideAngularModule,
  PiggyBank,
  FunnelPlus,
  PlusCircle,
} from 'lucide-angular';
import { PotsServiceService } from '../../services/pots-service.service';
import { Pots, Categories } from '../../services/pots-service.service';

@Component({
  selector: 'app-pots',
  standalone: true,
  imports: [MatButtonModule, LucideAngularModule, NgFor, CommonModule],
  templateUrl: './pots.component.html',
  styleUrl: './pots.component.scss',
})
export class PotsComponent {
  readonly PiggyBank = PiggyBank;
  readonly FunnelPlus = FunnelPlus;
  readonly PlusCircle = PlusCircle;

  pots: Pots[] = [];
  categories: Categories[] = [];

  constructor(
    private dialog: MatDialog,
    private PotsService: PotsServiceService
  ) {
    this.pots = this.PotsService.getPots();
    this.categories = this.PotsService.getCategories();
  }

  get totalSaved(): number {
    return this.pots.reduce((sum, pot) => sum + pot.amount, 0);
  }

  openForm() {
    this.dialog
      .open(PotsFormComponent, {
        width: '700px',
        height: '60vh',
        data: {},
      })
      .afterClosed()
      .subscribe((newPot) => {
        if (newPot) {
          this.pots.push(newPot);
        }
      });
  }
}
