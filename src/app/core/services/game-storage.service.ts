import {Injectable, OnDestroy} from '@angular/core';
import {Game} from "../models/game";
import {BehaviorSubject, Subject} from "rxjs";
import {GameService} from "./game.service";
import {takeUntil} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GameStorageService implements OnDestroy {

  private games: Game[];
  private destroy$ = new Subject();
  games$ = new BehaviorSubject(this.games);

  constructor(private gameService: GameService) {
    this.gameService.getAllGames()
      .pipe(takeUntil(this.destroy$))
      .subscribe((games) => {
        this.games$.next(games);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

}
