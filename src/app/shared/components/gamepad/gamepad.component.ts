import {Component, OnDestroy, OnInit} from '@angular/core';
import {Gamepad} from '../../../core/models/gamepad';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {GamepadStorageService} from '../../../core/services/gamepad-storage.service';


@Component({
  selector: 'app-gamepad',
  templateUrl: './gamepad.component.html',
  styleUrls: ['./gamepad.component.scss']
})
export class GamepadComponent implements OnInit, OnDestroy {


  gamepad: Gamepad;
  destroy$ = new Subject();

  constructor(
    private gamepadStorageService: GamepadStorageService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.gamepad = this.getGamepadFromStorageById(+params.id);
        console.log(this.gamepad);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private getGamepadFromStorageById(id: number): Gamepad {
    const gamepadById = this.gamepadStorageService.gamepads$.value.find(gamepad => gamepad.id === id);
    return gamepadById as Gamepad;
  }
}

