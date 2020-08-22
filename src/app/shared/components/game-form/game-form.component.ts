import {Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Game} from "../../../core/models/game";
import {Platform} from "../../../core/models/platform";
import {GameStorageService} from "../../../core/services/game-storage.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {GameService} from "../../../core/services/game.service";
import {Genre} from "../../../core/models/genre";

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss']
})
export class GameFormComponent implements OnInit, OnDestroy {
  private game: Game;
  private reactiveFormGroup: FormGroup;
  private platformsData: Platform[];
  private destroy$ = new Subject();

  constructor(
    private readonly formBuilder: FormBuilder,
    private gameService: GameService,
  ) { }

  // getter for platforms control variable to write less code
  get platformsFormArray() {
    return this.reactiveFormGroup.controls.platforms as FormArray;
  }

  // getter for addons control variable to write less code
  get addonsFormArray() {
    return this.reactiveFormGroup.controls.additionalContent as FormArray;
  }

  ngOnInit() {
    // gets all platforms from server and writes them to platformsData variable.
    // Then adds appropriate amount of checkboxes to our form
    this.gameService.getAllPlatforms()
      .pipe(takeUntil(this.destroy$))
      .subscribe((platforms) => {
        this.platformsData = platforms;
        this.addPlatformsToForm();
      });
    this.createForm();
  }

  protected registerForm() {
    // get genre and platform objects
    const platformsList = this.getFormPlatforms();
    // collects all values from our form and cast it to Game object
    this.game = Object.assign(new Game(), {
      ...this.reactiveFormGroup.value,
      platforms: platformsList,
    });
    console.log(this.reactiveFormGroup);
    // sends new game obj to server, then adds response game object to game storage service
    // this.gameService.addGame(this.game)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((game) => {
    //     this.gameStorage.games$.value.push(game);
    //     console.log(game);
    //   });
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
      genres: new FormArray([]),
      platforms: new FormArray([]),
      additionalContent: new FormArray([]),
    });
  }

  // maps through list of boolean values in form platforms and adds platform object
  // to platformsList if this platform was checked in form
  protected getFormPlatforms(): Platform[] {
    const platformsList = this.reactiveFormGroup.value.platforms
      .map((value, i) => value ? Object.assign(new Platform(), this.platformsData[i]) : null)
      .filter(v => v !== null);
    return platformsList;
  }

  // initialises checkboxes FormArray with false values so they all are unchecked by default
  protected addPlatformsToForm() {
    this.platformsData.forEach(() => this.platformsFormArray.push(new FormControl(false)));

  }

  private addAddonForm(): void {
    this.addonsFormArray.push(new FormControl(''));
  }

  private removeAddonForm(index: number): void {
    this.addonsFormArray.removeAt(index);
  }

}
