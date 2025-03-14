import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

import { Profit, ProfitPeriod } from "../models";
import { BackendUrl } from "../constants";

@Injectable({
  providedIn: 'root'
})
export class ProfitService {
  private readonly url: string = '/profits';

  constructor(private http: HttpClient) {
  }

  createProfit(profit: Profit): Observable<Profit> {
    return this.http.post<Profit>(`${BackendUrl}${this.url}`, profit);
  }

  getAllProfits(): Observable<Profit[]> {
    return this.http.get<Profit[]>(`${BackendUrl}${this.url}`)
        .pipe(
            map(res => res.map(item => new Profit(item)))
        );
  }

  getProfit(id: number): Observable<Profit> {
    return this.http.get<Profit>(`${BackendUrl}${this.url}/${id}`);
  }

  updateProfit(profit: Profit): Observable<Profit> {
    return this.http.put<Profit>(`${BackendUrl}${this.url}/${profit.id}`, profit);
  }

  deleteProfit(id: number): Observable<any> {
    return this.http.delete(`${BackendUrl}${this.url}/${id}`);
  }

  addProfitPeriod(profitId: number, profitPeriod: ProfitPeriod): Observable<ProfitPeriod> {
    return this.http.post<ProfitPeriod>(`${BackendUrl}${this.url}/${profitId}/periods`, profitPeriod);
  }

  updateProfitPeriod(profitId: number, profitPeriod: ProfitPeriod): Observable<ProfitPeriod> {
    return this.http.put<ProfitPeriod>(`${BackendUrl}${this.url}/${profitId}/periods/${profitPeriod.id}`, profitPeriod);
  }

  deleteProfitPeriod(profitId: number, profitPeriodId: number): Observable<any> {
    return this.http.delete<ProfitPeriod>(`${BackendUrl}${this.url}/${profitId}/periods/${profitPeriodId}`);
  }
}
