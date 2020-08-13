import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameService} from '../../../core/services/game.service';
import {Game} from '../../../core/models/game';
import {Subject} from "rxjs";
import {GameStorageService} from "../../../core/services/game-storage.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-game-master',
  templateUrl: './game-master.component.html',
  styleUrls: ['./game-master.component.scss']
})
export class GameMasterComponent implements OnInit, OnDestroy {

  gamesList: Game[];
  destroy$ = new Subject();

  constructor(private gameStorage: GameStorageService) {
  }

  ngOnInit() {
    console.log('game-master init');
    this.gameStorage.games$
      .pipe(takeUntil(this.destroy$))
      .subscribe((games) => {
        this.gamesList = games;
        console.log(this.gamesList);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    console.log('game-master destroying');
  }

}
