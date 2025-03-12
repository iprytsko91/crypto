import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ProfitJournalComponent } from "./profit-journal/profit-journal.component";
import { ChartsComponent } from "./charts/charts.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProfitJournalComponent, ChartsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'crypto';
}
