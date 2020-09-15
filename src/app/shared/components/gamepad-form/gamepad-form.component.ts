import {Component, OnDestroy, OnInit} from '@angular/core';
import {Gamepad} from '../../../core/models/gamepad';
import {GamepadService} from '../../../core/services/gamepad.service';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Color} from '../../../core/models/color';

@Component({
  selector: 'app-gamepad-form',
  templateUrl: './gamepad-form.component.html',
  styleUrls: ['./gamepad-form.component.scss']
})
export class GamepadFormComponent implements OnInit, OnDestroy {

  private gamepad: Gamepad;
  private reactiveFormGroup: FormGroup;
  private colorsData: Color[];
  private destroy$ = new Subject();


  constructor(
    private gamepadService: GamepadService,
    private readonly formBuilder: FormBuilder
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
        this.addColorToForm();
      });
    this.createForm();
  }

  clearForm() {
    this.reactiveFormGroup.reset();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
  }

  protected registerForm() {
    const colorsList = this.getFormColor();
    this.gamepad = Object.assign(new Gamepad(), {
      ...this.reactiveFormGroup.value,
      colors: colorsList
    });
    console.log(this.reactiveFormGroup);
    console.log(this.gamepad);

    // sends new game obj to server, then adds response game object to game storage service
    // this.gamepadService.addGamepad(this.gamepad)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((gamepad) => {
    //     this.gamepadStorageService.gamepads$.value.push(gamepad);
    //     console.log(gamepad);
    //   });
  }

  protected getFormColor(): Color[] {
    const colorsList = this.reactiveFormGroup.value.colors
      .map((value, i) => value ? Object.assign(new Color(), this.colorsData[i]) : null)
      .filter(v => v !== null);
    return colorsList;
  }
  protected addColorToForm() {
    this.colorsData.forEach(() => this.colorsFormArray.push(new FormControl(false)));

  }

  private createForm(): void {
    this.reactiveFormGroup = this.formBuilder.group({
      title: '',
      price: '',
      amount: '',
      color: new FormArray([]),
    });
  }
}
