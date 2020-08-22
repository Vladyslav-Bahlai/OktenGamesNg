import {Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-game-addon-form',
  templateUrl: './game-addon-form.component.html',
  styleUrls: ['./game-addon-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GameAddonFormComponent),
      multi: true
    }
  ]
})
export class GameAddonFormComponent implements OnInit, OnDestroy, ControlValueAccessor {

  private reactiveFormGroup: FormGroup;
  private destroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder
  ) { }


  ngOnInit() {
    this.reactiveFormGroup = this.formBuilder.group({
      title: '',
      price: '',
      score: '',
      releaseDate: '',
      amount: '',
      imgUrl: '',
      description: '',
    });
  }

  public onTouchCb() {
  }

  registerOnChange(fn: any): void {
    this.reactiveFormGroup.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouchCb = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.reactiveFormGroup.disable() : this.reactiveFormGroup.enable();
  }

  writeValue(obj: any): void {
    if (obj) {
      this.reactiveFormGroup.setValue(obj, {emitEvent: false});
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

}