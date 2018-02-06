import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsTransComponent } from './cars-trans.component';

describe('CarsTransComponent', () => {
  let component: CarsTransComponent;
  let fixture: ComponentFixture<CarsTransComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsTransComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
