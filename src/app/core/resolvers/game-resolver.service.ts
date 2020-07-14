import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Game} from "../models/game";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GameResolverService implements Resolve<Game[]> {

  constructor(
    private httpClient: HttpClient
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Game[]> | Promise<Game[]> | Game[] {
    return this.httpClient.get<Game[]>('http://localhost:8080/games/all');
  }
}
