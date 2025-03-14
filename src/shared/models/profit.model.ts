import { ProfitPeriod } from "./profit-period.model";

export class Profit {
  id: number;
  name: string;
  periods: ProfitPeriod[] = [];

  constructor(init?: Partial<Profit>) {
    Object.assign(this, init, {
      periods: init.periods?.map(item => new ProfitPeriod(item))
    })
  }
}
