import {Component, OnDestroy, OnInit} from '@angular/core';
import {Device} from '../../../core/models/device';
import {Subject} from 'rxjs';
import {DeviceStorageService} from '../../../core/services/device-storage.service';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ConditionState} from '../../../core/models/conditionState';
import {DeviceService} from '../../../core/services/device.service';
import {Color} from '../../../core/models/color';



@Component({
  selector: 'app-device-master',
  templateUrl: './device-master.component.html',
  styleUrls: ['./device-master.component.scss']
})
export class DeviceMasterComponent implements OnInit, OnDestroy {
  devicesList: Device[];
  device: {
    id: number,
    title: string,
    minPrice: number,
    maxPrice: number,
    conditionStates: ConditionState[]
  };
  private reactiveFormGroup: FormGroup;
  private conditionStatesData: ConditionState[] = [];
  private destroy$ = new Subject();
  private maxPrice = 0;

  constructor(
    private deviceStorageService: DeviceStorageService,
    private readonly formBuilder: FormBuilder,
    private deviceService: DeviceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.deviceStorageService.devices$
      .pipe(takeUntil(this.destroy$))
      .subscribe((devices) => {
        this.devicesList = devices;
      });
    this.deviceService.getConditionStates()
      .pipe(takeUntil(this.destroy$))
      .subscribe((conditionStates) => {
        this.conditionStatesData = conditionStates;
        this.addConditionStatesToForm();
      });
    console.log(this.devicesList);
    this.createForm();
  }

  navigateToDevice(device: Device): void {
    this.router.navigate(['devices', device.id], {state: {device}});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  get conditionStatesFormArray() {
    return this.reactiveFormGroup.controls.conditionStates as FormArray;
  }
  private createForm(): void {
    this.reactiveFormGroup = this.formBuilder.group({
      title: '',
      minPrice: 0,
      maxPrice: '',
      // gamepads: '',
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

  getmaxPrice(): number {
    this.devicesList.forEach(device => {
      if (device.price > this.maxPrice) {this.maxPrice = device.price; }
    });
    return this.maxPrice;
  }


  search(): void {
    const conditionStatesList = this.getFormConditionStates();
    this.device = Object.assign(new Object(), {
      ...this.reactiveFormGroup.value,
      conditionStates: conditionStatesList
    });
    if (typeof this.device.maxPrice === 'string') {
      this.device.maxPrice = this.getmaxPrice();
    }
    this.deviceStorageService.devices$.subscribe(values => {
      this.devicesList = this.deviceStorageService.filterDevice(values, this.device);
      console.log(this.device);
    });
  }
}
