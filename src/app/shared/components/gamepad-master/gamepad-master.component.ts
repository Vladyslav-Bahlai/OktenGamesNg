import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {GamepadStorageService} from '../../../core/services/gamepad-storage.service';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Gamepad} from '../../../core/models/gamepad';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {GamepadService} from '../../../core/services/gamepad.service';
import {Color} from '../../../core/models/color';


@Component({
  selector: 'app-gamepad-master',
  templateUrl: './gamepad-master.component.html',
  styleUrls: ['./gamepad-master.component.scss']
})
export class GamepadMasterComponent implements OnInit, OnDestroy {
  gamepadsList: Gamepad[];
  destroy$ = new Subject();
  gamepad: {
    id: number,
    title: string,
    minPrice: number,
    maxPrice: number,
    colors: Color[]
  };
  private reactiveFormGroup: FormGroup;
  private colorsData: Color[] = [];
  private maxPrice = 0;

  constructor(
    private readonly formBuilder: FormBuilder,
    private gamepadStorageService: GamepadStorageService,
    private gamepadService: GamepadService,
    private router: Router
  ) {
  }

  get colorsFormArray() {
    return this.reactiveFormGroup.controls.colors as FormArray;
  }

  ngOnInit() {
    this.gamepadStorageService.gamepads$
      .pipe(takeUntil(this.destroy$))
      .subscribe((gamepads) => {
        this.gamepadsList = gamepads;
      });
    this.gamepadService.getColor()
      .pipe(takeUntil(this.destroy$))
      .subscribe((colors) => {
        this.colorsData = colors;
        this.addColorsToForm();
      });
    console.log(this.gamepadsList);
    this.createForm();
  }

  navigateToGamepad(gamepad: Gamepad) {
    this.router.navigate(['gamepads', gamepad.id], {state: {gamepad}});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  getmaxPrice(): number {
    this.gamepadsList.forEach(gamepad => {
      if (gamepad.price > this.maxPrice) {this.maxPrice = gamepad.price; }
    });
    return this.maxPrice;
  }

  private createForm(): void {
    this.reactiveFormGroup = this.formBuilder.group({
      title: '',
      minPrice: 0,
      maxPrice: '',
      colors: new FormArray([]),
    });
  }

  protected getFormColors(): Color[] {
    const colorsList = this.reactiveFormGroup.value.colors
      .map((value, i) => value ? Object.assign(new Color(), this.colorsData[i]) : null)
      .filter(v => v !== null);
    return colorsList;
  }

  protected addColorsToForm() {
    this.colorsData.forEach(() => this.colorsFormArray.push(new FormControl(false)));
  }

  search(): void {
    const colorsList = this.getFormColors();
    this.gamepad = Object.assign(new Object(), {
      ...this.reactiveFormGroup.value,
      colors: colorsList
    });
    if (typeof this.gamepad.maxPrice === 'string') {
      this.gamepad.maxPrice = this.getmaxPrice();
    }
    this.gamepadStorageService.gamepads$.subscribe(values => {
      this.gamepadsList = this.gamepadStorageService.filterGamepad(values, this.gamepad);
      console.log(this.gamepad);
    });
  }
}
