import {Component, OnInit, Renderer2} from '@angular/core';
import {GameFormComponent} from "../game-form/game-form.component";
import {FormArray, FormBuilder} from "@angular/forms";
import {GameService} from "../../../core/services/game.service";
import {GameStorageService} from "../../../core/services/game-storage.service";

@Component({
  selector: 'app-game-addon-form',
  templateUrl: './game-addon-form.component.html',
  styleUrls: ['./game-addon-form.component.scss']
})
export class GameAddonFormComponent extends GameFormComponent implements OnInit {


  constructor(
    formBuilder: FormBuilder,
    gameService: GameService,
    gameStorage: GameStorageService,
    renderer: Renderer2
  ) {
    super(formBuilder, gameService, gameStorage, renderer);
  }

  ngOnInit() {

  }

}
