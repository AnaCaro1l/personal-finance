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
  EllipsisVertical,
} from 'lucide-angular';
import { PotsServiceService } from '../../services/pots-service.service';
import { Pots, Categories } from '../../services/pots-service.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-pots',
  standalone: true,
  imports: [
    MatButtonModule,
    LucideAngularModule,
    NgFor,
    CommonModule,
    MatMenuModule,
  ],
  templateUrl: './pots.component.html',
  styleUrl: './pots.component.scss',
})
export class PotsComponent {
  readonly PiggyBank = PiggyBank;
  readonly FunnelPlus = FunnelPlus;
  readonly PlusCircle = PlusCircle;
  readonly EllipsisVertical = EllipsisVertical;

  pots: Pots[] = [];
  filteredPots: Pots[] = [];
  categories: Categories[] = [];

  constructor(
    private dialog: MatDialog,
    private PotsService: PotsServiceService
  ) {
    this.pots = this.PotsService.getPots();
    this.categories = this.PotsService.getCategories();
    this.filteredPots = [...this.pots];
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
          this.filteredPots = [...this.pots];
        }
      });
  }

  editPot(index: number) {
    const pot = this.pots[index];
    this.dialog
      .open(PotsFormComponent, {
        width: '500px',
        height: 'auto',
        data: pot,
      })
      .afterClosed()
      .subscribe((updatedPot: Pots | null) => {
        if (updatedPot) {
          this.PotsService.updatePot(index, updatedPot);
          this.pots[index] = updatedPot;
          this.filteredPots = [...this.pots];
        }
      });
  }

  deletePot(index: number) {
    this.PotsService.removePot(index);
    this.pots.splice(index, 1);
    this.filteredPots = [...this.pots];
  }

  normalize(str: string): string {
    return str.toLowerCase().replace(/\s/g, '');
  }

  filterByCategory(category: string): void {
    const normalizedFilter = this.normalize(category);

    if (normalizedFilter === 'todos' || normalizedFilter === '') {
      this.filteredPots = [...this.pots];
      return;
    }

    this.filteredPots = this.pots.filter(
      (pot) => this.normalize(pot.category || '') === normalizedFilter
    );
  }
}
