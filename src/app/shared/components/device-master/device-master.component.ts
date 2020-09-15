import {Component, OnDestroy, OnInit} from '@angular/core';
import {Device} from '../../../core/models/device';
import {Subject} from 'rxjs';
import {DeviceStorageService} from '../../../core/services/device-storage.service';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-device-master',
  templateUrl: './device-master.component.html',
  styleUrls: ['./device-master.component.scss']
})
export class DeviceMasterComponent implements OnInit, OnDestroy {
  devicesList: Device[];
  destroy$ = new Subject();
  constructor(
    private deviceStorageService: DeviceStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.deviceStorageService.devices$
      .pipe(takeUntil(this.destroy$))
      .subscribe((devices) => {
        this.devicesList = devices;
      });
  }

  navigateToDevice(device: Device): void {
    this.router.navigate(['devices', device.id], {state: {device}});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
