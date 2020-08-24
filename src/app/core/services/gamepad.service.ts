import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Gamepad} from '../models/gamepad';

@Injectable({
  providedIn: 'root'
})
export class GamepadService {

  constructor(private httpClient: HttpClient) { }

  getAllGamepads(): Observable<Gamepad[]> {
    return this.httpClient.get<Gamepad[]>('http://localhost:8080/all-gamepads');
  }

  getGamepadById(id: string): Observable<Gamepad> {
    return this.httpClient.get<Gamepad>('http://localhost:8080/get-gamepad/' + id);
  }
}

