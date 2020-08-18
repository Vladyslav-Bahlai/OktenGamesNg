import { TestBed } from '@angular/core/testing';

import { GamepadResolverService } from './gamepad-resolver.service';

describe('GamepadResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GamepadResolverService = TestBed.get(GamepadResolverService);
    expect(service).toBeTruthy();
  });
});
