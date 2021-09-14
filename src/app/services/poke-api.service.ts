import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pokemons } from '../models/pokemons.model';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  readonly API_BASE_URL = "https://pokeapi.co/api/v2";
  constructor(private http: HttpClient) { }

  getPokemons(limit: number, offset?: number): Observable<Pokemons> {
    let params = new HttpParams();
    params = params.set("limit", limit.toString());
    params = offset ? params.set("offset", offset.toString()) : params;
    return this.http.get(this.API_BASE_URL + '/pokemon', { params: params }).pipe(shareReplay(1) as any);
  }

  getPokemon(url: string): Observable<any> {
    return this.http.get(url).pipe(shareReplay(1) as any);
  }
}
