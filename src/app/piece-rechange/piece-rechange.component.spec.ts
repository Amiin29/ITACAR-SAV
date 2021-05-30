import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieceRechangeComponent } from './piece-rechange.component';

describe('PieceRechangeComponent', () => {
  let component: PieceRechangeComponent;
  let fixture: ComponentFixture<PieceRechangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieceRechangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieceRechangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
