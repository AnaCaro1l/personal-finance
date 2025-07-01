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
          this.pots = this.PotsService.getPots();
        }
      });
  }

  deletePot(index: number) {
    this.PotsService.removePot(index);
    this.pots = this.PotsService.getPots();
  }

  filterByCategory(category: string): void {
    console.log(
      'DEBUG: Categoria recebida na função filterByCategory:',
      category
    );
    console.log('DEBUG: this.pots (ORIGINAL) antes do filtro:', this.pots);

    this.filteredPots = this.pots.filter((pot) => {
      // Garante que a propriedade 'category' existe e remove todos os espaços
      const potCategory = pot.category
        ? pot.category.toLowerCase().replace(/\s/g, '')
        : '';
      // Remove todos os espaços da categoria que veio do clique
      const filterCategory = category.toLowerCase().replace(/\s/g, '');

      console.log(
        `DEBUG: Comparando: Pot Category: '${potCategory}' | Filtro Categoria: '${filterCategory}'`
      );
      const isMatch = potCategory === filterCategory;
      console.log(`DEBUG: Resultado da comparação para este pot: ${isMatch}`);
      return isMatch;
    });

    console.log(
      'DEBUG: Pots filtrados para exibição (APÓS filtro):',
      this.filteredPots
    );

    // Se você tiver uma categoria 'Todos' para mostrar tudo, mantenha esta lógica
    if (category === 'Todos' || category === '') {
      // Adicione mais condições se houver outros nomes para 'Todos'
      this.filteredPots = [...this.pots];
    }
  }
}
