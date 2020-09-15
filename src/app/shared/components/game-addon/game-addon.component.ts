import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameAddon} from "../../../core/models/game-addon";
import {Subject} from "rxjs";

@Component({
  selector: 'app-game-addon',
  templateUrl: './game-addon.component.html',
  styleUrls: ['./game-addon.component.scss']
})
export class GameAddonComponent implements OnInit, OnDestroy {

  gameAddon: GameAddon;
  destroy$ = new Subject();

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

}
