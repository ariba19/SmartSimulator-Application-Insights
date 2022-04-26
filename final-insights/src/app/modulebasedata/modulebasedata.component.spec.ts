import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulebasedataComponent } from './modulebasedata.component';

describe('ModulebasedataComponent', () => {
  let component: ModulebasedataComponent;
  let fixture: ComponentFixture<ModulebasedataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModulebasedataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulebasedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
