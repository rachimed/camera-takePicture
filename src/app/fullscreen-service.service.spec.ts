import { TestBed } from '@angular/core/testing';

import { FullscreenServiceService } from './fullscreen-service.service';

describe('FullscreenServiceService', () => {
  let service: FullscreenServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullscreenServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
