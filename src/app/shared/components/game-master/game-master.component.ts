import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameService} from '../../../core/services/game.service';
import {Game} from '../../../core/models/game';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-game-master',
  templateUrl: './game-master.component.html',
  styleUrls: ['./game-master.component.scss']
})
export class GameMasterComponent implements OnInit, OnDestroy {

  gamesList: Game[];
  destroy$ = new Subject();

  constructor(
    private gameService: GameService,
    private activatedRoute: ActivatedRoute
  ) {
    this.gamesList = this.activatedRoute.snapshot.data.games;
    console.log(this.gamesList);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

}
