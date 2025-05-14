import { Routes } from '@angular/router';
import { OverviewComponent } from './pages/overview/overview.component';
import { PotsComponent } from './pages/pots/pots.component';

export const routes: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent },
  { path: 'pots', component: PotsComponent },
];
