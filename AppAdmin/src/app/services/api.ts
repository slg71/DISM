import { retry, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Trabajo } from '../models/trabajo';
import { Fichaje } from '../models/fichaje';

@Injectable({
  providedIn: 'root'
})
export class Api {

/*============Copia de DISM5===========*/
  // Api Path
  basePath = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  // Opciones Http
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // Manejador de errores API
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("Ha ocurrido un error:", error.error.message);
    } else {
      console.error(
        `Código Error: ${error.status},` +
        `Body: ${error.error}`
      );
    }
    return throwError(() => new Error('Ha sucedido un problema, inténtalo más tarde'));
  }
/*============Usuarios===========*/
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.basePath + '/usuarios').pipe(retry(2),catchError(this.handleError));
  }

/*============Trabajos===========*/
  getTrabajos(): Observable<Trabajo[]> {
    return this.http.get<Trabajo[]>(this.basePath + '/trabajos').pipe(retry(2),catchError(this.handleError));
  }

/*============Fichajes===========*/
  getFichajesAll(): Observable<Fichaje[]> {
    return this.http.get<Fichaje[]>(this.basePath + '/fichajes').pipe(retry(2),catchError(this.handleError));
  }
}
