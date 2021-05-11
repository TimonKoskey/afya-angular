import { TestBed } from '@angular/core/testing';

import { SessionAPIService } from './session-api.service';

describe('SessionAPIService', () => {
  let service: SessionAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
