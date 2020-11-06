import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {GamepadService} from './gamepad.service';
import {takeUntil} from 'rxjs/operators';
import {Gamepad} from '../models/gamepad';
import {GamepadMasterComponent} from '../../shared/components/gamepad-master/gamepad-master.component';

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
  compareColors(value, gamepad): boolean {
    // if (gamepad1.colors.forEach(color => color.name.includes(gamepad2.colors.forEach()))){
    //   return true;
    // }
    // return false;
    // if user didn't choose any colors
    if (gamepad.colors.length === 0) {
      return true;
    }
    for (const color1 of value.colors) {
      for (const color2 of gamepad.colors) {
        if (color1.name.includes(color2.name)) {
          return true;
        }
      }
    }
    return false;
  }
  filterGamepad(gamepads: Gamepad[], gamepad): Gamepad[] {
    return gamepads.filter(value => value.title.toLowerCase().includes(gamepad.title.toLowerCase()) &&
      (value.price >= gamepad.minPrice && value.price <= gamepad.maxPrice) &&
      // value.price >= gamepad.minPrice &&
      this.compareColors(value, gamepad)
      );
  }
}
