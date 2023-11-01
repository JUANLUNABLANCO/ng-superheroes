import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Superheroe } from '../models/superheroe.model';
import { Superheroes } from './fake-data-superheroes';
import { environment } from 'src/environments/environment';
import { Observable, of, from, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const BASE_URL = environment.API_URL;
@Injectable({
  providedIn: 'root'
})
export class SuperheroesService {

  constructor(
    private http: HttpClient
  ) { }

  getListSuperheroes(): Observable<Superheroe[]> {
    // TODO si existe backend
    // return  this.http.get<Superheroe[]>(`${BASE_URL}/api/superheroes`).pipe(
    //   map((superheroes: Superheroe[]) => {
    //     return superheroes;
    //   }),
    //   catchError(err => throwError(() => new Error(err)))
    // );
    return of(Superheroes) // fake data
  }
}
