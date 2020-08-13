import {Injectable, OnDestroy} from '@angular/core';
import {Game} from "../models/game";
import {BehaviorSubject, Subject} from "rxjs";
import {GameService} from "./game.service";
import {takeUntil} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GameStorageService implements OnDestroy {

  games: Game[];
  games$ = new BehaviorSubject(this.games);
  private destroy$ = new Subject();

  constructor(private gameService: GameService) {
    console.log('game storage init');
    console.log('get all games from server...');
    this.gameService.getAllGames()
      .pipe(takeUntil(this.destroy$))
      .subscribe((games) => {
        this.games$.next(games);
        console.log(games);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

}
