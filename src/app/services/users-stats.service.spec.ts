import { TestBed } from '@angular/core/testing';

import { UsersStatsService } from './users-stats.service';

describe('UsersStatsService', () => {
  let service: UsersStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
