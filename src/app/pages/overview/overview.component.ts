import { Component } from '@angular/core';
import { SummaryCardsComponent } from "../../components/summary-cards/summary-cards.component";
import { PotsComponent } from "../../components/pots/pots.component";
import { TransactionsComponent } from "../../components/transactions/transactions.component";
import { BudgetsComponent } from "../../components/budgets/budgets.component";
import { RecurringBillsComponent } from "../../components/recurring-bills/recurring-bills.component";

@Component({
  selector: 'app-overview',
  imports: [SummaryCardsComponent, PotsComponent, TransactionsComponent, BudgetsComponent, RecurringBillsComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {

}
