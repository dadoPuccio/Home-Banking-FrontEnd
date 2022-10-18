import { TestBed } from '@angular/core/testing';

import { SessionDataService } from './session-data.service';

describe('SessionDataService', () => {
  let service: SessionDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
