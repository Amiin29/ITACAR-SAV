import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatByModelComponent } from './stat-by-model.component';

describe('StatByModelComponent', () => {
  let component: StatByModelComponent;
  let fixture: ComponentFixture<StatByModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatByModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatByModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
