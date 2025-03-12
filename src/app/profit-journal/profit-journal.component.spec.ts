import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitJournalComponent } from './profit-journal.component';

describe('ProfitJournalComponent', () => {
  let component: ProfitJournalComponent;
  let fixture: ComponentFixture<ProfitJournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfitJournalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfitJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
