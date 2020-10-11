import {Component, OnDestroy, OnInit} from '@angular/core';
import {Gamepad} from '../../../core/models/gamepad';
import {Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {GamepadStorageService} from '../../../core/services/gamepad-storage.service';
import {GamepadService} from "../../../core/services/gamepad.service";


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
    private gamepadService: GamepadService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.getGamepadFromStorageById(+params.id);
        console.log(this.gamepad);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private getGamepadFromStorageById(id: number) {
    this.gamepad = this.gamepadStorageService.gamepads$.getValue().find(gamepad => gamepad.id === id);

    if (this.gamepad === undefined) {
      this.gamepadService.getGamepadById(id.toString())
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          console.log(data);
          this.gamepad = data;
        });
    }
  }
}

