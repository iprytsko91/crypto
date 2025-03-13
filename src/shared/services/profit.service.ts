import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Profit } from "../models";
import { BackendUrl } from "../constants";

@Injectable({
  providedIn: 'root'
})
export class ProfitService {
  private readonly url: string = '/profits';

  constructor(private http: HttpClient) {
  }

  createProfit(profit: Profit): Observable<any> {
    return this.http.post<Profit>(`${BackendUrl}${this.url}`, profit);
  }

  getAllProfits(): Observable<Profit[]> {
    return this.http.get<Profit[]>(`${BackendUrl}${this.url}`);
  }

  getProfit(id: number): Observable<Profit> {
    return this.http.get<Profit>(`${BackendUrl}${this.url}/${id}`);
  }

  updateProfit(profit: Profit): Observable<any> {
    return this.http.put(`${BackendUrl}${this.url}/${profit.id}`, profit);
  }

  deleteProfit(id: number): Observable<any> {
    return this.http.delete(`${BackendUrl}${this.url}/${id}`);
  }
}
