import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameService} from '../../../core/services/game.service';
import {Game} from '../../../core/models/game';
import {Subject} from "rxjs";

@Component({
  selector: 'app-game-master',
  templateUrl: './game-master.component.html',
  styleUrls: ['./game-master.component.scss']
})
export class GameMasterComponent implements OnInit, OnDestroy {

  gamesList: Game[];
  destroy$ = new Subject();

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

}
