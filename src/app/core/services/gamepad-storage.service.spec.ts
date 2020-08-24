import { TestBed } from '@angular/core/testing';

import { GamepadStorageService } from './gamepad-storage.service';

describe('GamepadStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GamepadStorageService = TestBed.get(GamepadStorageService);
    expect(service).toBeTruthy();
  });
});
