import { Component } from '@angular/core';
import { LucideAngularModule, PiggyBank } from 'lucide-angular';

@Component({
  selector: 'app-pots',
  imports: [
    LucideAngularModule,
  ],
  templateUrl: './pots.component.html',
  styleUrl: './pots.component.scss'
})
export class PotsComponent {
    readonly PiggyBank = PiggyBank;
}
