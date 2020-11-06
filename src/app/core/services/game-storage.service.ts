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

  comparePlatforms(game1, game2): boolean {
    for (const platform1 of game1.platforms) {
      for (const platform2 of game2.platforms) {
        if (platform1.id === platform2.id) {
          return true;
        }
      }
    }
    return false;
  }
  compareGenres(game1, game2): boolean {
    for (const genre1 of game1.platforms) {
      for (const genre2 of game2.platforms) {
        if (genre1.id === genre2.id) {
          return true;
        }
      }
    }
    return false;
  }

  filterGames(games: Game[], game): Game[] {
    console.log(game);
    return games.filter(value => (value.price >= game.minPrice && value.price <= game.maxPrice) &&
    this.comparePlatforms(value, game)
    // this.compareGenres(value, game)
    );
  }
}
