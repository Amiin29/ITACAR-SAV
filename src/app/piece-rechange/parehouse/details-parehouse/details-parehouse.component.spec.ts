import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsParehouseComponent } from './details-parehouse.component';

describe('DetailsParehouseComponent', () => {
  let component: DetailsParehouseComponent;
  let fixture: ComponentFixture<DetailsParehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsParehouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsParehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
