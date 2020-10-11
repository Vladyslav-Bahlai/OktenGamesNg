import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {GameService} from './game.service';
import {takeUntil} from 'rxjs/operators';
import {Game} from "../models/game";

@Injectable({
  providedIn: 'root'
})
export class GameStorageService implements OnDestroy {

  games$ = new BehaviorSubject<Game[]>([]);
  private destroy$ = new Subject();

  constructor(
    private gameService: GameService
  ) { }

  // sends request for all games and updates observable value
  public saveAllGames(): void {
    this.gameService.getAllGames()
      .pipe(takeUntil(this.destroy$))
      .subscribe((games) => {
        console.log(games);
        this.games$.next(games);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

}
