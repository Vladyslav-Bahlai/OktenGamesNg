import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Gamepad} from '../models/gamepad';
import {GamepadService} from '../services/gamepad.service';

@Injectable({
  providedIn: 'root'
})
export class GamepadResolverService implements Resolve<Gamepad[]> {

  constructor(private gamepadService: GamepadService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Gamepad[]> | Promise<Gamepad[]> | Gamepad[] {
    return this.gamepadService.getAllGamepads();
  }
}
