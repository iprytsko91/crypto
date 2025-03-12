import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { v4 as uuidv4 } from 'uuid';

import { ChartCurrencies } from "../../models/chart-currencies.model";
import { TickerService } from "../../services/ticker.service";
import { Interval } from "../../models/interval.model";
import { pipe, Subject, tap } from "rxjs";
import { AsyncPipe, JsonPipe } from "@angular/common";

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    AsyncPipe
  ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit {
  @Input() chartCurrencies!: ChartCurrencies;
  intervalNumber: number = 1;
  unity: string = 'm'
  limit: number = 5;
  data$: Subject<any> = new Subject();
  protected readonly id = uuidv4();

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
            this.data$.next(res);
          }),
        )
        .subscribe()
  }
}
