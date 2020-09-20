import {Component, OnInit} from '@angular/core';
import {GameService} from './core/services/game.service';
import {DeviceService} from './core/services/device.service';
import {GamepadService} from './core/services/gamepad.service';
import {AppRoutingModule} from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'OktenGamesNg';
  constructor(private gameService: GameService, private deviceService: DeviceService, private gamepadService: GamepadService) {
  }

  ngOnInit(): void {
    this.gameService.getAllGames();
    this.deviceService.getAllDevices();
    this.gamepadService.getAllGamepads();
  }

}
