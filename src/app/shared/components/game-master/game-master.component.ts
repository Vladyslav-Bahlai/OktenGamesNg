import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from '../../../core/models/game';
import {Subject} from 'rxjs';
import {GameStorageService} from '../../../core/services/game-storage.service';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';
import {environment} from "../../../../environments/environment";
import {Platform} from '../../../core/models/platform';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {GameService} from '../../../core/services/game.service';
import {Genre} from '../../../core/models/genre';

@Component({
  selector: 'app-game-master',
  templateUrl: './game-master.component.html',
  styleUrls: ['./game-master.component.scss']
})
export class GameMasterComponent implements OnInit, OnDestroy {
  env = environment;
  gamesList: Game[];
  game: {
    id: number,
    title: string,
    minPrice: number,
    maxPrice: number,
    platforms: Platform[],
    genres: Genre[]
  };
  private reactiveFormGroup: FormGroup;
  private genresData: Genre[] = [];
  private platformsData: Platform[] = [];
  destroy$ = new Subject();
  private maxPrice = 0;

  constructor(
    private gameStorage: GameStorageService,
    private readonly formBuilder: FormBuilder,
    private gameService: GameService,
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
    this.gameService.getAllPlatforms()
      .pipe(takeUntil(this.destroy$))
      .subscribe((platform) => {
        this.platformsData = platform;
        this.addPlatformsToForm();
      });
    this.gameService.getAllGenres()
      .pipe(takeUntil(this.destroy$))
      .subscribe((genre) => {
        this.genresData = genre;
        this.addGenresToForm();
      });
    console.log(this.gamesList);
    this.createForm();
  }

  navigateToGame(game: Game): void {
    this.router.navigate(['games', game.id], {state: {game}});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  get platformsFormArray() {
    return this.reactiveFormGroup.controls.platforms as FormArray;
  }
  get genresFormArray() {
    return this.reactiveFormGroup.controls.genres as FormArray;
  }

  protected getFormPlatforms(): Platform[] {
    const platformsList = this.reactiveFormGroup.value.platforms
      .map((value, i) => value ? Object.assign(new Platform(), this.platformsData[i]) : null)
      .filter(v => v !== null);
    return platformsList;
  }

  protected addPlatformsToForm() {
    this.platformsData.forEach(() => this.platformsFormArray.push(new FormControl(false)));
  }

  protected getFormGenres(): Genre[] {
    const genreList = this.reactiveFormGroup.value.genres
      .map((value, i) => value ? Object.assign(new Genre(), this.genresData[i]) : null)
      .filter(v => v !== null);
    return genreList;
  }

  protected addGenresToForm() {
    this.genresData.forEach(() => this.genresFormArray.push(new FormControl(false)));
  }
  private createForm(): void {
    this.reactiveFormGroup = this.formBuilder.group({
      title: '',
      minPrice: 0,
      maxPrice: '',
      platforms: new FormArray([]),
      genres: new FormArray([]),
    });
  }
  getmaxPrice(): number {
    this.gamesList.forEach(game => {
      if (game.price > this.maxPrice) {this.maxPrice = game.price; }
    });
    return this.maxPrice;
  }
  search(): void {
    const platformsList = this.getFormPlatforms();
    const genresList = this.getFormGenres();
    this.game = Object.assign(new Object(), {
      ...this.reactiveFormGroup.value,
      platforms: platformsList,
      genres: genresList,
    });
    if (typeof this.game.maxPrice === 'string') {
      this.game.maxPrice = this.getmaxPrice();
    }
    this.gameStorage.games$.subscribe(values => {
      this.gamesList = this.gameStorage.filterGames(values, this.game);
      console.log(this.gamesList);
    });
  }
}
