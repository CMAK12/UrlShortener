import { TestBed } from '@angular/core/testing';

import { ShortedUrlService } from './shorted-url.service';

describe('ShortedUrlService', () => {
  let service: ShortedUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShortedUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
