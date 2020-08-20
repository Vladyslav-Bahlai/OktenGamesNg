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
  // gets reference to genres add button
  @ViewChild('genreSelectionBtn', {static: false}) genreButton: ElementRef;
  // this variable is being initialized through setter cause
  // @ViewChild returns undefined when HTMLElement is invisible (*ngIf='false')
  private genreSelectionMenu: ElementRef;
  private game: Game;
  private reactiveFormGroup: FormGroup;
  private platformsData: Platform[];
  private genresData: Genre[];
  // stores values which genre was selected in form because idk how to implement it inside form
  private selectedGenresArray = [];
  private isGenreSelectionVisible = false;
  private destroy$ = new Subject();

  constructor(
    private readonly formBuilder: FormBuilder,
    private gameService: GameService,
    private gameStorage: GameStorageService,
    private renderer: Renderer2
  ) {
    // listens to clicks and hides genreSelectionMenu if user clicks outside the menu
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.genreButton.nativeElement.contains(e.target) &&
        this.genreSelectionMenu &&
        !this.genreSelectionMenu.nativeElement.contains(e.target)
      ) {
        this.isGenreSelectionVisible = false;
      }
    });
  }

  // setter is used to get reference to genreSelectionMenu so when genres menu becomes visible (*ngIf='true')
  // this setter is being automatically called and rewrites undefined value with actual reference
  @ViewChild('genreSelection', {static: false}) set menu(menuElement: ElementRef) {
    this.genreSelectionMenu = menuElement ? menuElement : undefined;
  }

  @Input() set setPlatformsData(value: Platform[]) {
    this.platformsData = value;
  }

  @Input() set setGenresData(value: Genre[]) {
    this.genresData = value;
  }

  // getter for platforms control variable to write less code
  get platformsFormArray() {
    return this.reactiveFormGroup.controls.platforms as FormArray;
  }

  // getter for platforms control variable to write less code
  get genresFormArray() {
    return this.reactiveFormGroup.controls.genres as FormArray;
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
    this.gameService.getAllGenres()
      .pipe(takeUntil(this.destroy$))
      .subscribe((genres) => {
        this.genresData = genres;
        this.addGenresToForm();
      });
    this.createForm();
  }

  protected registerForm() {
    // get genre and platform objects
    const platformsList = this.getFormPlatforms();
    const genresList = this.getFormGenres();
    // collects all values from our form and cast it to Game object
    this.game = Object.assign(new Game(), {
      ...this.reactiveFormGroup.value,
      platforms: platformsList,
      genres: genresList
    });
    console.log(this.game);
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

  // maps through list of boolean values in selectedGenres and adds genre object
  // to genresList if this genre was selected in form
  protected getFormGenres(): Genre[] {
    const genresList = this.selectedGenresArray
      .map((value, i) => value ? Object.assign(new Genre(), this.genresData[i]) : null)
      .filter(v => v !== null);
    return genresList;
  }

  // initialises checkboxes FormArray with false values so they all are unchecked by default
  protected addPlatformsToForm() {
    this.platformsData.forEach(() => this.platformsFormArray.push(new FormControl(false)));

  }

  // initialises form genres field and selectedGenres array with false values so they all are unchecked by default
  protected addGenresToForm() {
    this.genresData.forEach(() => this.genresFormArray.push(new FormControl(false)));
    this.genresData.forEach(() => this.selectedGenresArray.push(false));
  }

  // flips boolean value in selectedGenres by index.
  // Index corresponds to the genre position in genres selection menu
  private addGenreToForm(index: number): void {
    this.selectedGenresArray[index] = !this.selectedGenresArray[index];
  }

  // makes genres selection menu visible after clicking on 'Add genres' button
  private toggleGenreSelectionMenu() {
    this.isGenreSelectionVisible = !this.isGenreSelectionVisible;
  }

  private addAddonForm(): void {
    this.addonsFormArray.push(new FormControl(new Game()));
  }

  private removeAddonForm(index: number): void {
    this.addonsFormArray.removeAt(index);
  }

}
