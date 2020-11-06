import {Component, OnDestroy, OnInit} from '@angular/core';
import {Device} from '../../../core/models/device';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ConditionState} from '../../../core/models/conditionState';
import {Subject} from 'rxjs';
import {DeviceService} from '../../../core/services/device.service';
import {DeviceStorageService} from '../../../core/services/device-storage.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.scss']
})
export class DeviceFormComponent implements OnInit, OnDestroy {
  private device: Device;
  private reactiveFormGroup: FormGroup;
  private conditionStatesData: ConditionState[] = [];
  private destroy$ = new Subject();

  constructor(
    private readonly formBuilder: FormBuilder,
    private deviceService: DeviceService,
    private deviceStorageService: DeviceStorageService
  ) {
  }
  get conditionStatesFormArray() {
    return this.reactiveFormGroup.controls.conditionStates as FormArray;
  }
  ngOnInit() {
    this.deviceService.getConditionStates()
      .pipe(takeUntil(this.destroy$))
      .subscribe((conditionStates) => {
        this.conditionStatesData = conditionStates;
        this.addConditionStatesToForm();
      });
    this.createForm();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
  }
  protected registerForm() {
    const conditionStatesList = this.getFormConditionStates();
    this.device = Object.assign(new Device(), {
      ...this.reactiveFormGroup.value,
      conditionStates: conditionStatesList,
    });
    console.log(this.device);
    this.deviceService.addDevice(this.device)
      .pipe(takeUntil(this.destroy$))
      .subscribe((device) => {
        this.deviceStorageService.devices$.value.push(device);
        console.log(device);
      });
  }
  private createForm(): void {
    this.reactiveFormGroup = this.formBuilder.group({
      title: '',
      price: '',
      amount: '',
      gamepads: '',
      conditionStates: new FormArray([]),
    });
  }
  protected getFormConditionStates(): ConditionState[] {
    const conditionStatesList = this.reactiveFormGroup.value.conditionStates
      .map((value, i) => value ? Object.assign(new ConditionState(), this.conditionStatesData[i]) : null)
      .filter(v => v !== null);
    return conditionStatesList;
  }

  protected addConditionStatesToForm() {
    this.conditionStatesData.forEach(() => this.conditionStatesFormArray.push(new FormControl(false)));
  }
}
