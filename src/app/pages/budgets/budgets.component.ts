import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import { Chart, ChartConfiguration, registerables, Plugin } from 'chart.js';
import { MatTabsModule } from '@angular/material/tabs';
import { PotsServiceService, Pots } from '../../services/pots-service.service';
import { CommonModule } from '@angular/common';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { TransactionsServiceService } from '../../services/transactions-service.service';
import { Subscription } from 'rxjs';
import { BillsServiceService } from '../../services/bills-service.service';

Chart.register(...registerables);
Chart.register(ChartDataLabels);

@Component({
  selector: 'app-budgets',
  imports: [MatTabsModule, CommonModule],
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.scss',
})
export class BudgetsComponent implements AfterViewInit, OnInit {
  @ViewChild('doughnutCanvas')
  private doughnutCanvas!: ElementRef<HTMLCanvasElement>;
  private subscription!: Subscription;
  doughnutChart!: Chart;

  @ViewChild('barCanvas')
  private barCanvas!: ElementRef<HTMLCanvasElement>;
  barChart!: Chart;

  @ViewChild('lineCanvas')
  private lineCanvas!: ElementRef<HTMLCanvasElement>;
  lineChart!: Chart;

  Bills: any[] = [];

  transactions: any[] = [];

  pots: Pots[] = [];
  potsByCategory: Record<string, Pots[]> = {};
  potsByCategoryArray: { category: string; pots: any[] }[] = [];
  constructor(
    private potsService: PotsServiceService,
    private TransService: TransactionsServiceService,
    private BillsService: BillsServiceService
  ) {}

  ngOnInit(): void {
    this.transactions = this.TransService.getTransactions();

    this.Bills = this.BillsService.getBills();
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
    if (this.barCanvas?.nativeElement) {
      this.createBarChart();
    }
    if (this.lineCanvas?.nativeElement) {
      this.createLineChart();
    }

    this.subscription = this.potsService.pots$.subscribe((pots) => {
      this.pots = [...pots];
      this.potsByCategory = this.potsService.getPotsbyCategory(this.pots);
      this.updateChart();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createLineChart() {
  const totalBills = this.Bills;

  const billsByMonth: Record<string, number> = {};

  totalBills.forEach((bill) => {
    const date = new Date(bill.dueDate);
    if (isNaN(date.getTime())) return;

    const month = date.toLocaleString('en-US', { month: 'long' });

    billsByMonth[month] = (billsByMonth[month] || 0) + Number(bill.amount);
  });

  const orderedMonths = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const billsData = orderedMonths.map((month) => billsByMonth[month] || 0);

  const lineChartData: ChartConfiguration<'line'> = {
    type: 'line',
    data: {
      labels: orderedMonths,
      datasets: [
        {
          label: 'Total Bills per Month',
          data: billsData,
          fill: false,
          borderColor: 'rgba(255, 99, 132, 0.6)',
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Total Bills per Month' },
      },
      scales: {
        y: { beginAtZero: true },
      },
    },
  };

  this.lineChart = new Chart(this.lineCanvas.nativeElement, lineChartData);
}
  createBarChart() {
    const receivedByMonth: Record<string, number> = {};
    const paidByMonth: Record<string, number> = {};

    this.transactions.forEach((tx) => {
      const date = new Date(tx.date);
      const month = date.toLocaleString('en-US', { month: 'long' });

      if (tx.toggle === 'Received') {
        receivedByMonth[month] =
          (receivedByMonth[month] || 0) + Number(tx.amount);
      } else {
        paidByMonth[month] = (paidByMonth[month] || 0) + Number(tx.amount);
      }
    });

    const orderedMonths = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const receivedData = orderedMonths.map(
      (month) => receivedByMonth[month] || 0
    );
    const paidData = orderedMonths.map((month) => paidByMonth[month] || 0);

    const barChartData: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: orderedMonths,
        datasets: [
          {
            label: 'Received',
            data: receivedData,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
          {
            label: 'Paid',
            data: paidData,
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Received vs Paid per Month' },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    };

    this.barChart = new Chart(this.barCanvas.nativeElement, barChartData);
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
      ([_, items]) =>
        items.reduce(
          (acc: number, pot: Pots) => acc + (Number(pot.amount) || 0),
          0
        )
    );
    const categoryLabels = Object.keys(this.potsByCategory);
    const backgroundColors = ['#14B8A6', '#FB923C', '#C084FC', '#F472B6'];

    this.doughnutChart.data.labels = categoryLabels;
    this.doughnutChart.data.datasets[0].data = categoryTotals;
    this.doughnutChart.data.datasets[0].backgroundColor =
      backgroundColors.slice(0, categoryTotals.length);
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
