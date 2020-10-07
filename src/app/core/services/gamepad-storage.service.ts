import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
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
}
