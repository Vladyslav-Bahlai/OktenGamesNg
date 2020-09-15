import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Device} from '../../../core/models/device';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {DeviceService} from '../../../core/services/device.service';
import {DeviceStorageService} from '../../../core/services/device-storage.service';


@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit, OnDestroy {

  device: Device;
  destroy$ = new Subject();

  constructor(
    private deviceStorageService: DeviceStorageService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.device = this.getDeviceFromStorageById(+params.id);
        console.log(this.device);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private getDeviceFromStorageById(id: number): Device {
    const deviceById = this.deviceStorageService.devices$.value.find(device => device.id === id);
    return deviceById as Device;
  }

}
