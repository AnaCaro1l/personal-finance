import { Component, OnInit } from '@angular/core';
import { LucideAngularModule, CircleUserRound, LogOut, UserRoundPen } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [ LucideAngularModule, CommonModule ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  readonly CircleUserRound = CircleUserRound;
  readonly LogOut = LogOut;
  readonly UserRoundPen = UserRoundPen;

  user: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  logout(): void {
    localStorage.removeItem('auth');
    this.router.navigate(['/login']);
  }

  editUser(): void {
    this.router.navigate(['/register'], { state: { user: this.user } });
  }
}
