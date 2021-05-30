import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParehouseComponent } from './parehouse.component';

describe('ParehouseComponent', () => {
  let component: ParehouseComponent;
  let fixture: ComponentFixture<ParehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParehouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
