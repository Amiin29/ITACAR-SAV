import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoSERVICENonFactureComponent } from './histo-service-non-facture.component';

describe('HistoSERVICENonFactureComponent', () => {
  let component: HistoSERVICENonFactureComponent;
  let fixture: ComponentFixture<HistoSERVICENonFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoSERVICENonFactureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoSERVICENonFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
