import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChartComponent } from "../../shared/components/chart/chart.component";
import { ChartCurrencies } from "../../shared/models/chart-currencies.model";
import { CryptoCurrency } from "../../shared/models/crypto-currency.enum";
import { Currency } from "../../shared/models/currency.enum";
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [
    ChartComponent,
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
