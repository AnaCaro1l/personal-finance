import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  ChartType,
  registerables,
  Plugin,
} from 'chart.js';
import { Pots, PotsServiceService } from '../../services/pots-service.service';
import { CommonModule } from '@angular/common';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

Chart.register(...registerables);
Chart.register(ChartDataLabels);

@Component({
  selector: 'app-budgets',
  imports: [CommonModule, RouterModule],
  providers: [],
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.scss',
})
export class BudgetsComponent implements OnInit, AfterViewInit {
  @ViewChild('doughnutCanvas')
  private doughnutCanvas!: ElementRef<HTMLCanvasElement>;
  private subscription!: Subscription;
  doughnutChart!: Chart;

  pots: Pots[] = [];
  potsByCategory: Record<string, Pots[]> = {};
  potsByCategoryArray: { category: string; pots: any[] }[] = [];
  constructor(private potsService: PotsServiceService) {}

  ngOnInit(): void {
    this.subscription = this.potsService.pots$.subscribe((pots) => {
      this.pots = [...pots];
      this.potsByCategory = this.potsService.getPotsbyCategory(this.pots);
      this.updateChart();
    });
  }

  centerTextPlugin: Plugin = {
    id: 'centerTextPlugin',
    beforeDraw(chart) {
      const { ctx, width, height } = chart;
      if (!ctx) return;

      const dataset = chart.data.datasets[0].data as number[];
      const total = dataset.reduce((acc, val) => acc + val, 0);

      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#444';

      ctx.font = 'bold 16px Arial';
      ctx.fillText('Total', width! / 2, height! / 2 - 10);

      ctx.font = 'bold 20px Arial';
      ctx.fillText(`$${total.toFixed(2)}`, width! / 2, height! / 2 + 15);

      ctx.restore();
    },
  };

  ngAfterViewInit(): void {
    if (this.doughnutCanvas?.nativeElement) {
      this.createChart();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createChart() {
    if (this.doughnutChart) {
      this.doughnutChart.destroy();
    }

    const categoryTotals = Object.entries(this.potsByCategory).map(
      ([_, itens]) =>
        itens.reduce(
          (acc: number, pot: Pots) => acc + (Number(pot.amount) || 0),
          0
        )
    );

    const categoryLabels = Object.keys(this.potsByCategory);
    const backgroundColors = ['#14B8A6', '#FB923C', '#C084FC', '#F472B6'];

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
          datalabels: {
            display: false,
          },
        },
        cutout: '60%',
      },
      plugins: [this.centerTextPlugin],
    };

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, config);
  }

  updateChart() {
    if (!this.doughnutChart) {
      this.createChart();
    }

    const categoryTotals = Object.entries(this.potsByCategory).map(
      ([_, items]) => items.reduce((acc: number, pot: any) => acc + (Number(pot.value) || 0), 0)
    );
    const categoryLabels = Object.keys(this.potsByCategory);
    const backgroundColors = ['#14B8A6', '#FB923C', '#C084FC', '#F472B6'];

    this.doughnutChart.data.labels = categoryLabels;
    this.doughnutChart.data.datasets[0].data = categoryTotals;
    this.doughnutChart.data.datasets[0].backgroundColor = backgroundColors.slice(0, categoryTotals.length);
    this.doughnutChart.update();
  }

  getTotalValue(pots: Pots[]): number {
    return pots.reduce((acc, pot) => acc + pot.amount, 0);
  }

  getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      entertainment: '#14B8A6',
      bills: '#FB923C',
      diningOut: '#C084FC',
      personalCare: '#F472B6',
    };
    return colors[category] || '#000';
  }
}
