import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {GamepadStorageService} from '../../../core/services/gamepad-storage.service';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Gamepad} from '../../../core/models/gamepad';
import {FormArray, FormBuilder, FormControl, FormGroup, NgModel} from '@angular/forms';
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
  gamepad: Gamepad;
  private reactiveFormGroup: FormGroup;
  private colorsData: Color[] = [];

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
    this.createForm();
  }

  navigateToGamepad(gamepad: Gamepad) {
    this.router.navigate(['gamepads', gamepad.id], {state: {gamepad}});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private createForm(): void {
    this.reactiveFormGroup = this.formBuilder.group({
      title: '',
      minPrice: '',
      maxPrice: '',
      amount: '',
      colors: new FormArray([]),
    });
  }

  protected getFormColors(): Color[] {
    const colorsList = this.reactiveFormGroup.value.colors
      .map((value, i) => value ? Object.assign(new Color(), this.colorsData[i]) : null)
      .filter(v => v !== null);
    return colorsList;
    //   .map((value, i) => value ? Object.assign(new Color(), this.colorsData[i]) : null)
    //   .filter(v => v !== null);
    // return colorsList;
  }

  protected addColorsToForm() {
    this.colorsData.forEach(() => this.colorsFormArray.push(new FormControl(false)));
  }

  search(): void {
    const colorsList = this.getFormColors();
    this.gamepad = Object.assign(new Gamepad(), {
      ...this.reactiveFormGroup.value,
      colors: colorsList
    });

    this.gamepadStorageService.gamepads$.subscribe(values => {
      this.gamepadsList = this.gamepadStorageService.filterGamepad(values, this.gamepad);
      console.log(this.gamepadsList);
      console.log(this.gamepad.colors);
    });
  }
}
