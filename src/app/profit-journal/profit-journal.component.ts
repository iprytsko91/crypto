import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AsyncPipe, DatePipe, NgForOf, NgIf } from "@angular/common";
import { BehaviorSubject, tap } from "rxjs";
import { FormsModule } from "@angular/forms";

import { Profit, ProfitPeriod, ProfitService } from "../../shared";


@Component({
  selector: 'app-profit-journal',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    NgIf,
    FormsModule,
    DatePipe
  ],
  templateUrl: './profit-journal.component.html',
  styleUrl: './profit-journal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfitJournalComponent {
  profits$: BehaviorSubject<Profit[]> = new BehaviorSubject<Profit[]>([]);
  editingProfitPeriodId: number = null;
  editingProfitPeriod: ProfitPeriod = null;

  constructor(private profitService: ProfitService, private cdr: ChangeDetectorRef) {
    this.loadAllProfits();
  }

  isPendingNewProfitPeriod(profit: Profit): boolean {
    return profit.periods.some(item => item.id === null) || this.editingProfitPeriodId !== null;
  }

  addProfit() {
    const name = prompt('Create New Profit:', 'Name');

    if (name === undefined || name === null || name === '') {
      return;
    }

    const profit = new Profit({ name })

    this.profitService.createProfit(profit)
        .pipe(
            tap(() => this.loadAllProfits())
        ).subscribe()
  }

  editProfit(profit: Profit) {
    const name = prompt('Update New Profit:', profit.name);

    if (name === profit.name || name === undefined || name === null || name === '') {
      return;
    }

    profit = this.adjustProfitBeforeSave(profit);
    profit.name = name;

    this.profitService.updateProfit(profit)
        .pipe(
            tap(() => this.loadAllProfits())
        ).subscribe();
  }

  addPeriod(profit: Profit) {
    const startDate = new Date();
    let endDate = new Date();
    endDate.setDate(endDate.getDate() + 1);

    const newProfitPeriod = new ProfitPeriod({
      id: null,
      start: startDate.getTime(),
      end: endDate.getTime(),
      factor: 1
    });

    profit.periods.push(newProfitPeriod);
    this.editingProfitPeriod = newProfitPeriod;
  }

  deleteProfit(profit: Profit): void {
    if (!this.confirmDeleteProfit(profit)) {
      return;
    }

    this.profitService.deleteProfit(profit.id)
        .pipe(
            tap(() => this.loadAllProfits())
        )
        .subscribe();
  }

  startEditingProfitPeriod(period: ProfitPeriod): void {
    this.editingProfitPeriodId = period.id;
    this.editingProfitPeriod = structuredClone(period);
  }

  saveProfitPeriodEdit(profit: Profit, period: ProfitPeriod): void {
    let actionObservable;

    period.start = new Date(period.start).getTime();
    period.end = new Date(period.end).getTime();

    if (period.id === null) {
      actionObservable = this.profitService.addProfitPeriod(profit.id, period);
    } else {
      actionObservable = this.profitService.updateProfitPeriod(profit.id, period);
    }

    actionObservable
        .pipe(
            tap(() => this.editingProfitPeriodId = null),
            tap(() => this.loadAllProfits())
        ).subscribe();
  }

  cancelProfitPeriodEdit(profit: Profit, period: ProfitPeriod): void {
    if (period.id === null) {
      profit.periods.pop();
    }

    this.editingProfitPeriodId = null;
    this.editingProfitPeriod = null;
  }

  deleteProfitPeriod(profitId: number, profitPeriod: ProfitPeriod): void {
    if (!this.confirmDeleteProfitPeriod(profitPeriod)) {
      return;
    }

    this.profitService.deleteProfitPeriod(profitId, profitPeriod.id)
        .pipe(
            tap(() => this.loadAllProfits())
        )
        .subscribe();
  }

  // TODO: better to encapsulate it in Profit class to avoid such methods.
  private adjustProfitBeforeSave(profit: Profit): Profit {
    profit.periods = this.adjustProfitPeriodsDatesBeforeSave(profit.periods);

    return profit;
  }

  private loadAllProfits(): void {
    this.profitService.getAllProfits()
        .pipe(
            tap(res => this.profits$.next(res)),
        ).subscribe();
  }

  private adjustProfitPeriodsDatesBeforeSave(profitPeriods: ProfitPeriod[]): ProfitPeriod[] {
    return profitPeriods.map(item => {
      return {
        ...item,
        start: new Date(item.start).getTime(),
        end: new Date(item.end).getTime()
      };
    });
  }

  private confirmDeleteProfit(profit: Profit): boolean {
    const text = `Are you sure want to delete ${profit.name}?`;

    return confirm(text);
  }

  private confirmDeleteProfitPeriod(profitPeriod: ProfitPeriod): boolean {
    const text = `Are you sure want to delete period ${profitPeriod.start} - ${profitPeriod.end} - ${profitPeriod.factor}?`;

    return confirm(text);
  }

}
