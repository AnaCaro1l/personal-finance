import { Routes } from '@angular/router';
import { OverviewComponent } from './pages/overview/overview.component';
import { PotsComponent } from './pages/pots/pots.component';
import { RecurringBillsComponent } from './pages/recurring-bills/recurring-bills.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';

export const routes: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent },
  { path: 'pots', component: PotsComponent },
  { path: 'recurring-bills', component: RecurringBillsComponent },
  { path: 'transactions', component: TransactionsComponent },
];
