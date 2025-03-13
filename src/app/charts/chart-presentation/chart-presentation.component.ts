import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { v4 as uuidv4 } from "uuid";
import { tap } from "rxjs";

import { BarChart, ChartCurrencies, Interval, LineChart, Ticker, TickerService } from "../../../shared";


@Component({
  selector: 'app-chart-presentation',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './chart-presentation.component.html',
  styleUrl: './chart-presentation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartPresentationComponent implements OnInit {
  @Input() chartCurrencies!: ChartCurrencies;
  @Input() intervalNumber: number = 1;
  @Input() unity: string = 'm'
  @Input() limit: number = 7;

  data: Ticker[] = [];
  chart: any;
  isBarChartDrawn: boolean = true; // TODO: better to use some toggle buttons with radiobutton behaviour
  isLineChartDrawn: boolean = false;
  protected readonly id = uuidv4();
  protected readonly htmlChartId = `chart-${this.id}`

  get title(): string {
    return `${this.chartCurrencies.cryptoCurrency}/${this.chartCurrencies.currency}`;
  }

  get interval(): Interval {
    return `${this.intervalNumber}${this.unity}` as Interval
  }

  constructor(private tickerService: TickerService) {
  }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData(): void {
    this.tickerService.getTicker(this.chartCurrencies.cryptoCurrency, this.chartCurrencies.currency, this.interval, this.limit)
        .pipe(
            tap(res => {
              this.data = res;
              this.updateChart();
            }),
        )
        .subscribe()
  }

  drawBarChart() {
    const chart = new BarChart();
    chart.draw(this.htmlChartId, this.data)

    this.isLineChartDrawn = false;
    this.isBarChartDrawn = true;
  }

  drawLineChart() {
    const chart = new LineChart();
    chart.draw(this.htmlChartId, this.data)

    this.isLineChartDrawn = true;
    this.isBarChartDrawn = false;
  }

  private updateChart(): void {
    if (this.isBarChartDrawn) {
      this.drawBarChart();
    } else if (this.isLineChartDrawn) {
      this.drawLineChart();
    }
  }
}
