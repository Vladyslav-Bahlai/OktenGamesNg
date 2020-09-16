import {Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Genre} from "../../../core/models/genre";
import {GameService} from "../../../core/services/game.service";
import {BehaviorSubject, Subject} from "rxjs";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {takeUntil, takeWhile} from "rxjs/operators";

@Component({
  selector: 'app-genres-table',
  templateUrl: './genres-table.component.html',
  styleUrls: ['./genres-table.component.scss'],
})
export class GenresTableComponent implements OnInit, OnDestroy {

  // gets reference to genres add button
  @ViewChild('genreSelectionBtn', {static: false}) genreButton: ElementRef;
  @Input() private parentForm: FormGroup;
  // this variable is being initialized through setter cause
  // @ViewChild returns undefined when HTMLElement is invisible (*ngIf='false')
  private genreSelectionMenu: ElementRef;
  // stores values which genre was selected in form because idk how to implement it inside form
  private selectedGenres = [];
  private isGenreSelectionVisible = false;
  // observable is used to notify other parts of the component that data from server has been received
  private genresData$ = new BehaviorSubject<Genre[]>([]);
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

  // @Input is used on setter to set a new value to genresData$ when data has been received from server
  @Input()
  set genresData(value: Genre[]) {
    this.genresData$.next(value);
  }

  get genresData() {
    return this.genresData$.getValue();
  }

  // setter is used to get reference to genreSelectionMenu so when genres menu becomes visible (*ngIf='true')
  // this setter is being automatically called and rewrites undefined value with actual reference
  @ViewChild('genreSelection', {static: false}) set menu(menuElement: ElementRef) {
    this.genreSelectionMenu = menuElement ? menuElement : undefined;
  }

  // getter for platforms control variable to write less code
  get genresFormArray() {
    return this.parentForm.controls.genres as FormArray;
  }

  ngOnInit() {
    // fillGenresArray() method will be called only when data change in genresData$ occurs
    this.genresData$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.fillGenresArray();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
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
    this.genresFormArray.at(index).setValue(!isGenreSelected);

    if (isGenreSelected) {
      const selectedGenreIndex = this.selectedGenres.indexOf(selectedGenre);
      this.selectedGenres.splice(selectedGenreIndex, 1);
    } else {
      this.selectedGenres.push(selectedGenre);
    }
  }

  private isGenreSelected(genre: Genre): boolean {
    return this.selectedGenres.includes(genre);
  }

}
