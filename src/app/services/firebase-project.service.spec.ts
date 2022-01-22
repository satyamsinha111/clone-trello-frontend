import { TestBed } from '@angular/core/testing';

import { FirebaseProjectService } from './firebase-project.service';

describe('FirebaseProjectService', () => {
  let service: FirebaseProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
