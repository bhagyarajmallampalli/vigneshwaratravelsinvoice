import { TestBed, inject } from '@angular/core/testing';

import { CarsTransService } from './cars-trans.service';

describe('CarsTransService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarsTransService]
    });
  });

  it('should be created', inject([CarsTransService], (service: CarsTransService) => {
    expect(service).toBeTruthy();
  }));
});
