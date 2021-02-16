import { TestBed } from '@angular/core/testing';

import { PainServiceService } from './pain-service.service';

describe('PainServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PainServiceService = TestBed.get(PainServiceService);
    expect(service).toBeTruthy();
  });
});
