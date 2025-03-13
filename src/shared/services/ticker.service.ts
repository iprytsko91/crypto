import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { CryptoCurrency, Currency, Interval, Ticker } from "../models";
import { BackendUrl } from "../constants";


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
