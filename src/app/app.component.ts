import {Component, OnInit} from '@angular/core';
import {GameService} from "./core/services/game.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'OktenGamesNg';

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    this.gameService.getAllGames();
  }
}
