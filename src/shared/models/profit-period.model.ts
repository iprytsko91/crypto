export class ProfitPeriod {
  id: number;
  start: number | string;
  end: number | string;
  factor: number;

  constructor(init?: Partial<ProfitPeriod>) {
    Object.assign(this, init, {
      start: new Date(init.start).toISOString().split('T')[0], // TODO: think about more clean way to work with dates.
      end: new Date(init.end).toISOString().split('T')[0]
    });
  }
}
