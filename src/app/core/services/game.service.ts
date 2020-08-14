import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Game} from "../models/game";
import {Platform} from "../models/platform";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpClient: HttpClient) {
  }

  getAllGames(): Observable<Game[]> {
    return this.httpClient.get<Game[]>('http://localhost:8080/games/all');
  }

  getGameById(id: string): Observable<Game> {
    return this.httpClient.get<Game>('http://localhost:8080/games/get/' + id);
  }

  addGame(game: Game): Observable<Game> {
    return this.httpClient.post<Game>('http://localhost:8080/games/add', game);
  }

  getAllPlatforms(): Observable<Platform[]> {
    return this.httpClient.get<Platform[]>('http://localhost:8080/games/platforms');
  }

}
