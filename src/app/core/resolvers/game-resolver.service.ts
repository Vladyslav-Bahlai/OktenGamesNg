import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Game} from "../models/game";
import {GameService} from "../services/game.service";

@Injectable({
  providedIn: 'root'
})
export class GameResolverService implements Resolve<Game[]> {

  constructor(
    private gameService: GameService
  ) { }

  // redo this method so it analise whether url is '/games' or '/games/:id'
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Game[]> | Promise<Game[]> | Game[] {
    return this.gameService.getAllGames();
  }
}
