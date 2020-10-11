import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from '../../../core/models/game';
import {ActivatedRoute} from "@angular/router";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {GameStorageService} from "../../../core/services/game-storage.service";
import {GameService} from "../../../core/services/game.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  game: Game;
  destroy$ = new Subject();
  env =  environment;

  constructor(
    private gameStorage: GameStorageService,
    private gameService: GameService,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit() {
    // listens to changes in url params
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.setGameFromStorageById(+params.id);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  // gets game from storage by id, if no game was found, sends request for single game to server
  private setGameFromStorageById(id: number) {
    this.game = this.gameStorage.games$.getValue()
      .find(game => game.id === id);

    if (this.game === undefined) {
      this.gameService.getGameById(id.toString())
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          console.log(data);
          this.game = data;
        });
    }
  }
}
