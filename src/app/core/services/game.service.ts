import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Game} from '../models/game';
import {Platform} from '../models/platform';
import {Genre} from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpClient: HttpClient) {
  }

  public getAllGames(): Observable<Game[]> {
    return this.httpClient.get<Game[]>('http://localhost:8080/games/all');
  }

  public getGameById(id: string): Observable<Game> {
    return this.httpClient.get<Game>('http://localhost:8080/games/get/' + id);
  }

  public addGameFormData(formData: FormData): Observable<Game> {
    return this.httpClient.post<Game>('http://localhost:8080/games/add', formData);
  }

  public getAllPlatforms(): Observable<Platform[]> {
    return this.httpClient.get<Platform[]>('http://localhost:8080/games/platforms');
  }

  public getAllGenres(): Observable<Genre[]> {
    return this.httpClient.get<Genre[]>('http://localhost:8080/games/genres');
  }

}
