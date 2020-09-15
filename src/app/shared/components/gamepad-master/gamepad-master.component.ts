import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {GamepadStorageService} from '../../../core/services/gamepad-storage.service';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Gamepad} from '../../../core/models/gamepad';


@Component({
  selector: 'app-gamepad-master',
  templateUrl: './gamepad-master.component.html',
  styleUrls: ['./gamepad-master.component.scss']
})
export class GamepadMasterComponent implements OnInit, OnDestroy {
  gamepadsList: Gamepad[];
  destroy$ = new Subject();

  constructor(
    private gamepadStorageService: GamepadStorageService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.gamepadStorageService.gamepads$
      .pipe(takeUntil(this.destroy$))
      .subscribe((gamepads) => {
        this.gamepadsList = gamepads;
      });
  }

  navigateToGamepad(gamepad: Gamepad) {
    this.router.navigate(['gamepads', gamepad.id], {state: {gamepad}});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
