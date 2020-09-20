import {Component, OnDestroy, OnInit} from '@angular/core';
import {Gamepad} from '../../../core/models/gamepad';
import {GamepadService} from '../../../core/services/gamepad.service';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Color} from '../../../core/models/color';
import {GamepadStorageService} from '../../../core/services/gamepad-storage.service';


@Component({
  selector: 'app-gamepad-form',
  templateUrl: './gamepad-form.component.html',
  styleUrls: ['./gamepad-form.component.scss']
})
export class GamepadFormComponent implements OnInit, OnDestroy {

  private gamepad: Gamepad;
  private reactiveFormGroup: FormGroup;
  private colorsData: Color[] = [];
  private destroy$ = new Subject();

  constructor(
    private readonly formBuilder: FormBuilder,
    private gamepadService: GamepadService,
    private gamepadStorageService: GamepadStorageService
  ) {
  }

  get colorsFormArray() {
    return this.reactiveFormGroup.controls.colors as FormArray;
  }

  ngOnInit() {
    this.gamepadService.getColor()
      .pipe(takeUntil(this.destroy$))
      .subscribe((colors) => {
        this.colorsData = colors;
        this.addColorsToForm();
      });
    this.createForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  protected registerForm() {
    const colorsList = this.getFormColors();
    this.gamepad = Object.assign(new Gamepad(), {
      ...this.reactiveFormGroup.value,
      colors: colorsList
    });
    console.log(this.gamepad);

    this.gamepadService.addGamepad(this.gamepad)
      .pipe(takeUntil(this.destroy$))
      .subscribe((gamepad) => {
        this.gamepadStorageService.gamepads$.value.push(gamepad);
        console.log(gamepad);
      });
  }

  private createForm(): void {
    this.reactiveFormGroup = this.formBuilder.group({
      title: '',
      price: '',
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
}
