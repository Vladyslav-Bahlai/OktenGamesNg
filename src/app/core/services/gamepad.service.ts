import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Gamepad} from '../models/gamepad';
import {Color} from '../models/color';

@Injectable({
  providedIn: 'root'
})
export class GamepadService {

  constructor(private httpClient: HttpClient) { }

  getAllGamepads(): Observable<Gamepad[]> {
    return this.httpClient.get<Gamepad[]>('http://localhost:8080/gamepads/all-gamepads');
  }

  getGamepadById(id: string): Observable<Gamepad> {
    return this.httpClient.get<Gamepad>('http://localhost:8080/gamepads/get-gamepad/' + id);
  }

  addGamepad(gamepad: Gamepad): Observable<Gamepad> {
    return this.httpClient.post<Gamepad>('http://localhost:8080/gamepads/add-gamepad', gamepad);
  }

  public getColor(): Observable<Color[]> {
    return this.httpClient.get<Color[]>('http://localhost:8080/gamepads/colors');
  }
}



