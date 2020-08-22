import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Genre} from "../../../core/models/genre";
import {takeUntil} from "rxjs/operators";
import {GameService} from "../../../core/services/game.service";
import {Subject} from "rxjs";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-genres-table',
  templateUrl: './genres-table.component.html',
  styleUrls: ['./genres-table.component.scss']
})
export class GenresTableComponent implements OnInit, OnDestroy {

  // gets reference to genres add button
  @ViewChild('genreSelectionBtn', {static: false}) genreButton: ElementRef;
  // this variable is being initialized through setter cause
  // @ViewChild returns undefined when HTMLElement is invisible (*ngIf='false')
  private genreSelectionMenu: ElementRef;
  private genresData: Genre[];
  private selectedGenres = [];
  // stores values which genre was selected in form because idk how to implement it inside form
  private genresFormGroup: FormGroup;
  private isGenreSelectionVisible = false;
  private destroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private gameService: GameService,
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

  // getter for platforms control variable to write less code
  get genresFormArray() {
    return this.genresFormGroup.controls.genres as FormArray;
  }

  ngOnInit() {
    this.gameService.getAllGenres()
      .pipe(takeUntil(this.destroy$))
      .subscribe((genres) => {
        this.genresData = genres;
        this.fillGenresArray();
        console.log(this.genresFormGroup);
      });
    this.createGenresForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private createGenresForm(): void {
    this.genresFormGroup = this.formBuilder.group({
      genres: new FormArray([])
    });
  }

  private fillGenresArray(): void {
    this.genresData.forEach(() => this.genresFormArray.push(new FormControl(false)));
  }

  // makes genres selection menu visible after clicking on 'Add genres' button
  private toggleGenreSelectionMenu() {
    this.isGenreSelectionVisible = !this.isGenreSelectionVisible;
  }

  private manageSelectedGenres(index: number): void {
    const selectedGenre = this.genresData[index];
    const isGenreSelected = this.genresFormArray.at(index).value;
    this.genresFormArray.removeAt(index);
    this.genresFormArray.insert(index, new FormControl(!isGenreSelected));

    if (isGenreSelected) {
      const selectedGenreIndex = this.selectedGenres.indexOf(selectedGenre);
      this.selectedGenres.splice(selectedGenreIndex, 1);
    } else {
      this.selectedGenres.push(selectedGenre);
    }
    console.log(this.genresFormGroup);
  }

}
