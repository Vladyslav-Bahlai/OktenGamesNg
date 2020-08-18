import {Injectable, OnDestroy} from '@angular/core';
import {Device} from '../models/device';
import {BehaviorSubject, Subject} from 'rxjs';
import {DeviceService} from './device.service';
import {takeUntil} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeviceStorageService implements OnDestroy{

  devices: Device[];
  devices$ = new BehaviorSubject(this.devices);
  private destroy$ = new Subject();
  constructor(private deviceService: DeviceService) {
    console.log('device storage init');
    console.log('get all devicess from server...');
    this.deviceService.getAllDevices()
      .pipe(takeUntil(this.destroy$))
      .subscribe(devices => {
        this.devices$.next(devices);
        console.log(devices);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
