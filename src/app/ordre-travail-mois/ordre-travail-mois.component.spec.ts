import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdreTravailMoisComponent } from './ordre-travail-mois.component';

describe('OrdreTravailMoisComponent', () => {
  let component: OrdreTravailMoisComponent;
  let fixture: ComponentFixture<OrdreTravailMoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdreTravailMoisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdreTravailMoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
