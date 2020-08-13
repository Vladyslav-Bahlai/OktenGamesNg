import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {GameService} from "../../../core/services/game.service";
import {Game} from "../../../core/models/game";
import {Platform} from "../../../core/models/platform";
import {GameStorageService} from "../../../core/services/game-storage.service";

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss']
})
export class GameFormComponent implements OnInit {

  game: Game;
  reactiveFormGroup: FormGroup;
  platformsData = [
    {id: 1, name: 'PS5'},
    {id: 2, name: 'PS4'},
    {id: 3, name: 'PS3'},
  ];

  constructor(
    private readonly formBuilder: FormBuilder,
    private gameService: GameService,
    private gameStorage: GameStorageService
  ) {
  }

  get platformsFormArray() {
    return this.reactiveFormGroup.controls.platforms as FormArray;
  }

  ngOnInit() {
    this.createForm();
    console.log('game-form init');
  }

  registerForm() {
    const platformsList = this.getFormPlatforms();
    // collect all values from our form and cast it to Game object
    this.game = Object.assign(new Game(), {...this.reactiveFormGroup.value, platforms: platformsList});
    console.log('sending game object to server...');
    this.gameService.addGame(this.game)
      .subscribe((game) => {
        console.log(game);
        this.gameStorage.games$.value.push(game);
      });
  }

  clearForm() {
    this.reactiveFormGroup.reset();
  }

  private createForm(): void {
    this.reactiveFormGroup = this.formBuilder.group({
      title: '',
      company: '',
      price: '',
      score: '',
      releaseDate: '',
      amount: '',
      imgUrl: '',
      description: '',
      genres: '',
      platforms: new FormArray([]),
    });

    this.addCheckboxesToForm();

  }

  // initialises checkboxes FormArray with false values so they all are unchecked
  private addCheckboxesToForm() {
    this.platformsData.forEach(() => this.platformsFormArray.push(new FormControl(false)));
  }

  private getFormPlatforms(): Platform[] {
    // maps through list of boolean values in form and adds platform string name value to
    // platformsList if it was checked in form
    const platformsList = this.reactiveFormGroup.value.platforms
      .map((value, i) => value ? Object.assign(new Platform(), this.platformsData[i]) : null)
      .filter(v => v !== null);

    return platformsList;
  }

}
