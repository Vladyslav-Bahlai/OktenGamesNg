import {Injectable, OnDestroy} from '@angular/core';
import {Device} from '../models/device';
import {BehaviorSubject, Subject} from 'rxjs';
import {DeviceService} from './device.service';
import {takeUntil} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeviceStorageService implements OnDestroy {
  private devices: Device[];
  private destroy$ = new Subject();
  devices$ = new BehaviorSubject(this.devices);
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
}
