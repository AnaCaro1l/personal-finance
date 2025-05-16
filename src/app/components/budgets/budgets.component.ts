import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { PotsServiceService } from '../../services/pots-service.service';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-budgets',
  imports: [CommonModule],
  providers: [],
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.scss',
})
export class BudgetsComponent implements OnInit, AfterViewInit {
  @ViewChild('doughnutCanvas')
  private doughnutCanvas!: ElementRef<HTMLCanvasElement>;
  doughnutChart!: Chart;
  
  pots: any[] = [];
  potsByCategory: Record<string, any> = {};
  potsByCategoryArray: { category: string; pots: any[] }[] = [];
  constructor(private potsService: PotsServiceService) {};

  ngOnInit(): void {
    this.pots = [...this.potsService.getPots()];
    this.potsByCategory = this.potsService.getPotsbyCategory(this.pots);
  }

  ngAfterViewInit(): void {
    const categoryTotals = Object.entries(this.potsByCategory).map(
      ([_, itens]) =>
        itens.reduce((acc: number, pot: any) => acc + pot.value, 0)
    );

    const categoryLabels = Object.keys(this.potsByCategory);
    const backgroundColors = ['#9CA3AF', '#4B5563', '#60A5FA', '#A78BFA'];

    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: {
        labels: categoryLabels,
        datasets: [
          {
            data: categoryTotals,
            backgroundColor: backgroundColors.slice(0, categoryTotals.length),
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        cutout: '70%',
      },
    };

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, config);
  }

  getTotalValue(pots: any[]): number {
    return pots.reduce((acc, pot) => acc + pot.value, 0);
  }

  getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      entertainment: '#9CA3AF',
      bills: '#4B5563',
      diningOut: '#60A5FA',
      personalCare: '#A78BFA',
    };
    return colors[category] || '#000';
  }
}
