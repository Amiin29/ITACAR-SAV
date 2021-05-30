import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPieceRechangesComponent } from './details-piece-rechanges.component';

describe('DetailsPieceRechangesComponent', () => {
  let component: DetailsPieceRechangesComponent;
  let fixture: ComponentFixture<DetailsPieceRechangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsPieceRechangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPieceRechangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
