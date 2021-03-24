import { TestBed } from '@angular/core/testing';

import { NgSimpleAlertService } from './ng-simple-alert.service';

describe('NgSimpleAlertService', () => {
  let service: NgSimpleAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgSimpleAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
