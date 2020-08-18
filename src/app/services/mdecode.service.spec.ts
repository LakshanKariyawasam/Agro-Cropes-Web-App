import { TestBed, inject } from '@angular/core/testing';

import { MdecodeService } from './mdecode.service';

describe('MdecodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MdecodeService]
    });
  });

  it('should be created', inject([MdecodeService], (service: MdecodeService) => {
    expect(service).toBeTruthy();
  }));
});
