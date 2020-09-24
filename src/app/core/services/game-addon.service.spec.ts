import { TestBed } from '@angular/core/testing';

import { GameAddonService } from './game-addon.service';

describe('GameAddonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameAddonService = TestBed.get(GameAddonService);
    expect(service).toBeTruthy();
  });
});
