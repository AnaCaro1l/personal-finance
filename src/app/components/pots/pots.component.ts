import { Component } from '@angular/core';
import { LucideAngularModule, PiggyBank } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pots',
  imports: [
    LucideAngularModule,
    RouterLink
  ],
  templateUrl: './pots.component.html',
  styleUrl: './pots.component.scss'
})
export class PotsComponent {
    readonly PiggyBank = PiggyBank;
}
