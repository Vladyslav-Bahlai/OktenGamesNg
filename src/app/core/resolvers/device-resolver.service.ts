import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Device} from '../models/device';
import {DeviceService} from '../services/device.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceResolverService implements Resolve<Device[]> {

  constructor(private deviceService: DeviceService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Device[]> | Promise<Device[]> | Device[] {
    return this.deviceService.getAllDevices();
  }
}
