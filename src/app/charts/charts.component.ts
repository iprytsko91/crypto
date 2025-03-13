import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForOf } from "@angular/common";

import { ChartCurrencies, CryptoCurrency, Currency } from "../../shared";
import { ChartPresentationComponent } from "./chart-presentation/chart-presentation.component";


@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [
    ChartPresentationComponent,
    NgForOf
  ],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartsComponent {
  charts: ChartCurrencies[] = [
    {
      cryptoCurrency: CryptoCurrency.Btc,
      currency: Currency.Usd
    },
    {
      cryptoCurrency: CryptoCurrency.Eth,
      currency: Currency.Usd
    }
  ];
}
