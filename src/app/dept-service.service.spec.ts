import { TestBed, inject } from '@angular/core/testing';

import { DeptService } from './dept-service.service';

describe('DeptServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeptService]
    });
  });

  it('should be created', inject([DeptService], (service: DeptService) => {
    expect(service).toBeTruthy();
  }));
});
