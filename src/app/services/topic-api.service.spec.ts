import { TestBed } from '@angular/core/testing';

import { TopicApiService } from './topic-api.service';

describe('TopicApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TopicApiService = TestBed.get(TopicApiService);
    expect(service).toBeTruthy();
  });
});
