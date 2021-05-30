import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRDVComponent } from './update-rdv.component';

describe('UpdateRDVComponent', () => {
  let component: UpdateRDVComponent;
  let fixture: ComponentFixture<UpdateRDVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRDVComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRDVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
