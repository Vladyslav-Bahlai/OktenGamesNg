import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Game} from "../models/game";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpClient: HttpClient) {
  }

  getAllGames(): Observable<Game[]> {
    return this.httpClient.get<Game[]>('http://localhost:8080/games/all');
  }

  // consider deleting this method
  getGameById(id: string): Observable<Game> {
    return this.httpClient.get<Game>('http://localhost:8080/games/get/' + id);
  }

  addGame(game: Game): void {
    this.httpClient.post('http://localhost:8080/games/add', game);
  }

}
