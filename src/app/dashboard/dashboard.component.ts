import { Component } from '@angular/core';
import { LayoutComponent } from "../layout/layout.component";
import { RouterOutlet } from "@angular/router";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [LayoutComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private router: Router) {
    if (localStorage.getItem('auth') !== 'true') {
      this.router.navigate(['/login']);
    }
  }
}
