import { Component } from '@angular/core';
import { LucideAngularModule, Menu, House, ArrowUpDown, ChartPie, PiggyBank, Receipt } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    LucideAngularModule,
    RouterLink,
    NgClass,
    NgIf
],
  providers: [],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  readonly Menu = Menu;
  readonly House = House;
  readonly ArrowUpDown = ArrowUpDown;
  readonly ChartPie = ChartPie;
  readonly PiggyBank = PiggyBank;
  readonly Receipt = Receipt;

  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}

