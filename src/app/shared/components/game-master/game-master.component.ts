import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from '../../../core/models/game';
import {Subject} from 'rxjs';
import {GameStorageService} from '../../../core/services/game-storage.service';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game-master',
  templateUrl: './game-master.component.html',
  styleUrls: ['./game-master.component.scss']
})
export class GameMasterComponent implements OnInit, OnDestroy {

  gamesList: Game[];
  destroy$ = new Subject();

  constructor(
    private gameStorage: GameStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    // sends request for all games to save them in storage
    this.gameStorage.saveAllGames();
    // gets games from game storage when data from server arrives and writes them to gameList variable
    this.gameStorage.games$
      .pipe(takeUntil(this.destroy$))
      .subscribe((games) => {
        this.gamesList = games;
      });
  }

  navigateToGame(game: Game): void {
    this.router.navigate(['games', game.id], {state: {game}});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

}
