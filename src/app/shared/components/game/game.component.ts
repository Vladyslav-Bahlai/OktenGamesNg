import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from '../../../core/models/game';
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {GameService} from "../../../core/services/game.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  game: Game;
  id: number;
  destroy$ = new Subject();

  constructor(
    private gameService: GameService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.id = +params.id;
        this.changeCurrentGame();
      });
  }

  navigateToGame(game: Game): void {
    this.router.navigate(['games', game.id], {state: {game}});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private changeCurrentGame() {
    this.gameService.games$
      .pipe(takeUntil(this.destroy$))
      .subscribe(games => {
        this.game = games[this.id - 1];
        console.log(this.game);
      });
  }

}
