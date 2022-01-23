import { TestBed } from '@angular/core/testing';

import { FirebaseTaskService } from './firebase-task.service';

describe('FirebaseTaskService', () => {
  let service: FirebaseTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
