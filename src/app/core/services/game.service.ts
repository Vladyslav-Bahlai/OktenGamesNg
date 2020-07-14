import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Game} from "../models/game";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  games: Game[];
  games$ = new BehaviorSubject(this.games);

  constructor(private httpClient: HttpClient) {
  }

  getAllGames() {
    this.httpClient
      .get<Game[]>('http://localhost:8080/games/all')
      .subscribe(value => {
        this.games = value;
        this.games$.next(this.games);
      });
  }

  // consider deleting this method
  getGameById(id: string): Observable<Game> {
    return this.httpClient.get<Game>('http://localhost:8080/games/get/' + id);
  }

}
