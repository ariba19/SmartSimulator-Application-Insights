import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaydashboardComponent } from './todaydashboard.component';

describe('TodaydashboardComponent', () => {
  let component: TodaydashboardComponent;
  let fixture: ComponentFixture<TodaydashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodaydashboardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaydashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
