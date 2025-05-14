import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-budgets',
  imports: [

  ],
  providers: [],
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.scss',
})
export class BudgetsComponent {
  @ViewChild('doughnutCanvas') private doughnutCanvas!: ElementRef<HTMLCanvasElement>;
  doughnutChart!: Chart;

  ngAfterViewInit(): void {
    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: {
        labels: ['Entertainment', 'Bills', 'Dining Out', 'Personal Care'],
        datasets: [{
          data: [50, 750, 75, 100],
          backgroundColor: ['#9CA3AF', '#4B5563', '#60A5FA', '#A78BFA'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        cutout: '70%'
      }
    };

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, config);
  }
}
