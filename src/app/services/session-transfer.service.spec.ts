import { TestBed } from '@angular/core/testing';

import { SessionTransferService } from './session-transfer.service';

describe('SessionTransferService', () => {
  let service: SessionTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
