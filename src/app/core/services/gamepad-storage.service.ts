import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {GamepadService} from './gamepad.service';
import {takeUntil} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GamepadStorageService implements OnDestroy {
  gamepads$ = new BehaviorSubject([]);
  private destroy$ = new Subject();

  constructor(private gamepadService: GamepadService) {
    this.gamepadService.getAllGamepads()
      .pipe(takeUntil(this.destroy$))
      .subscribe((gamepads) => {
        this.gamepads$.next(gamepads);
        console.log(gamepads);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  filterGamepad(gamepads: Gamepad[], gamepad): Gamepad[] {
    console.log(gamepad);
    return gamepads.filter(value => value.title.toLowerCase().includes(gamepad.title.toLowerCase()) &&
      (value.price >= gamepad.minPrice && value.price <= gamepad.maxPrice) && value.colors === gamepad.colors);
  }
}
