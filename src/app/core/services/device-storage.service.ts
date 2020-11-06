import {Injectable, OnDestroy} from '@angular/core';
import {Device} from '../models/device';
import {BehaviorSubject, Subject} from 'rxjs';
import {DeviceService} from './device.service';
import {takeUntil} from 'rxjs/operators';
import {Gamepad} from '../models/gamepad';

@Injectable({
  providedIn: 'root'
})
export class DeviceStorageService implements OnDestroy {
  private destroy$ = new Subject();
  devices$ = new BehaviorSubject([]);

  constructor(private deviceService: DeviceService) {
    this.deviceService.getAllDevices()
      .pipe(takeUntil(this.destroy$))
      .subscribe((devices) => {
        this.devices$.next(devices);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
  compareConditionStates(device1, device2): boolean {
    for (const conditionState1 of device1.conditionStates) {
      for (const conditionState2 of device2.conditionStates) {
        if (conditionState1.name.includes(conditionState2.name)) {
          return true;
        }
      }
    }
    return false;
  }
  filterDevice(devices: Device[], device): Device[] {
    console.log(device);
    if (device.conditionStates.length === 0) {
      return devices.filter(value => (value.price >= device.minPrice && value.price <= device.maxPrice)
      );
    } else {
      return devices.filter(value => (value.price >= device.minPrice && value.price <= device.maxPrice) &&
        this.compareConditionStates(value, device)
      );
    }
  }
}
