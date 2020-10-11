import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Game} from '../models/game';
import {Platform} from '../models/platform';
import {Genre} from '../models/genre';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  env = environment;

  constructor(private httpClient: HttpClient) {
  }

  public getAllGames(): Observable<Game[]> {
    return this.httpClient.get<Game[]>(this.env.apiUrl + 'games/all');
  }

  public getGameById(id: string): Observable<Game> {
    return this.httpClient.get<Game>(this.env.apiUrl + 'games/get/' + id);
  }

  public addGameFormData(formData: FormData): Observable<Game> {
    return this.httpClient.post<Game>(this.env.apiUrl + 'games/add', formData);
  }

  public getAllPlatforms(): Observable<Platform[]> {
    return this.httpClient.get<Platform[]>(this.env.apiUrl + 'games/platforms');
  }

  public getAllGenres(): Observable<Genre[]> {
    return this.httpClient.get<Genre[]>(this.env.apiUrl + 'games/genres');
  }
}
