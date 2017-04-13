import { TestBed, inject } from '@angular/core/testing';

import { RssService } from './rss.service';

describe('RssService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RssService]
    });
  });

  it('should ...', inject([RssService], (service: RssService) => {
    expect(service).toBeTruthy();
  }));
});
