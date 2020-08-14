import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {GameService} from "../../../core/services/game.service";
import {Game} from "../../../core/models/game";
import {Platform} from "../../../core/models/platform";
import {GameStorageService} from "../../../core/services/game-storage.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss']
})
export class GameFormComponent implements OnInit, OnDestroy {

  game: Game;
  reactiveFormGroup: FormGroup;
  platformsData: Platform[];
  destroy$ = new Subject();

  constructor(
    private readonly formBuilder: FormBuilder,
    private gameService: GameService,
    private gameStorage: GameStorageService
  ) {
  }

  // getter for platforms control variable to write less code
  get platformsFormArray() {
    return this.reactiveFormGroup.controls.platforms as FormArray;
  }

  ngOnInit() {
    // gets all platforms from server and writes them to platformsData variable.
    // Then adds appropriate amount of checkboxes to our form
    this.gameService.getAllPlatforms()
      .pipe(takeUntil(this.destroy$))
      .subscribe((platforms) => {
        this.platformsData = platforms;
        this.addCheckboxesToForm();
      });
    this.createForm();
  }

  registerForm() {
    const platformsList = this.getFormPlatforms();
    // collects all values from our form and cast it to Game object
    this.game = Object.assign(new Game(), {...this.reactiveFormGroup.value, platforms: platformsList});
    // sends new game obj to server, then adds response game object to game storage service
    this.gameService.addGame(this.game)
      .pipe(takeUntil(this.destroy$))
      .subscribe((game) => {
        this.gameStorage.games$.value.push(game);
        console.log(game);
      });
  }

  clearForm() {
    this.reactiveFormGroup.reset();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
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
  }

  // initialises checkboxes FormArray with false values so they all are unchecked
  private addCheckboxesToForm() {
    this.platformsData.forEach(() => this.platformsFormArray.push(new FormControl(false)));
  }

  // maps through list of boolean values in form platforms and adds platform object
  // to platformsList if this platform was checked in form
  private getFormPlatforms(): Platform[] {
    const platformsList = this.reactiveFormGroup.value.platforms
      .map((value, i) => value ? Object.assign(new Platform(), this.platformsData[i]) : null)
      .filter(v => v !== null);

    return platformsList;
  }

}
