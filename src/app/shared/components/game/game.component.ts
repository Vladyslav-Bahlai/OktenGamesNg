import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from '../../../core/models/game';
import {ActivatedRoute} from "@angular/router";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {GameStorageService} from "../../../core/services/game-storage.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  game: Game;
  destroy$ = new Subject();

  constructor(
    private gameStorage: GameStorageService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.game = this.getGameFromStorageById(+params.id);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private getGameFromStorageById(id: number): Game {
    const gameById = this.gameStorage.games$.value.find(game => game.id === id);
    return gameById as Game;
  }

}
