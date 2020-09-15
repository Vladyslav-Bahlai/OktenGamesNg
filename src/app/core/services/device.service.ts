import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Device} from '../models/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private httpClient: HttpClient) { }
  getAllDevices(): Observable<Device[]> {
    return this.httpClient.get<Device[]>('http://localhost:8080/devices/all-devices');
  }
  getDeviceById(id: string): Observable<Device> {
    return this.httpClient.get<Device>('http://localhost:8080/devices/get-devices/' + id);
  }
}
