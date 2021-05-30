import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatByStatusComponent } from './stat-by-status.component';

describe('StatByStatusComponent', () => {
  let component: StatByStatusComponent;
  let fixture: ComponentFixture<StatByStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatByStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatByStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
