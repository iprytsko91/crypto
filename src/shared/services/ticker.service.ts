import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Interval } from "../models/interval.model";
import { BackendUrl } from "../constants";
import { Currency } from "../models/currency.enum";
import { CryptoCurrency } from "../models/crypto-currency.enum";
import { Ticker } from "../models/ticker.model";

@Injectable({
  providedIn: 'root'
})
export class TickerService {
  private readonly url: string = '/ticker';

  constructor(private http: HttpClient) {}

  getTicker(cryptoCurrency: CryptoCurrency, currency: Currency, interval: Interval, limit: number): Observable<Ticker[]> {
    const combinedCurrency = `${cryptoCurrency}${currency}`;

    return this.http.get<Ticker[]>(`${BackendUrl}${this.url}/${combinedCurrency}/${interval}/${limit}`);
  }
}
