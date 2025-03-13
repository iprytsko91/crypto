import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPresentationComponent } from './chart-presentation.component';

describe('ChartComponent', () => {
  let component: ChartPresentationComponent;
  let fixture: ComponentFixture<ChartPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartPresentationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
