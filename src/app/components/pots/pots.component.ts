import { Component } from '@angular/core';
import { LucideAngularModule, PiggyBank } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { PotsServiceService } from '../../services/pots-service.service';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pots',
  imports: [LucideAngularModule, RouterLink, NgFor, CommonModule],
  templateUrl: './pots.component.html',
  styleUrl: './pots.component.scss',
})
export class PotsComponent {
  readonly PiggyBank = PiggyBank;

  pots: any[] = [];

  constructor(private potsService: PotsServiceService) {
    this.pots = [...this.potsService.getPots()];
  }
}
