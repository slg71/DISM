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

  createUsuario(item: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.basePath + '/usuarios', JSON.stringify(item), this.httpOptions).pipe(retry(2),catchError(this.handleError));
  }

  updateUsuario(item: Usuario): Observable<Usuario> {
    //separo el id del body de usuario pa evitar errores
    const id = item.IdUsuario;
    const { IdUsuario, ...body } = item;

    console.log("UPDATE: " + JSON.stringify(item));
    return this.http.put<Usuario>(this.basePath + '/usuarios/' + id, body, this.httpOptions).pipe(retry(2),catchError(this.handleError));
  }

  deleteUsuario(IdUsuario: number): Observable<Usuario> {
    return this.http.delete<Usuario>(this.basePath + '/usuarios/' + IdUsuario, this.httpOptions).pipe(retry(2),catchError(this.handleError));
  }

/*============Trabajos===========*/
  getTrabajos(): Observable<Trabajo[]> {
    return this.http.get<Trabajo[]>(this.basePath + '/trabajos').pipe(retry(2),catchError(this.handleError));
  }

  createTrabajo(item: Trabajo): Observable<Trabajo> {
    return this.http.post<Trabajo>(this.basePath + '/trabajos', JSON.stringify(item), this.httpOptions).pipe(retry(2),catchError(this.handleError));
  }

  updateTrabajo(item: Trabajo): Observable<Trabajo> {
    //separo el id del body de usuario pa evitar errores
    const id = item.IdTrabajo;
    const { IdTrabajo, ...body } = item;

    console.log("UPDATE: " + JSON.stringify(item));
    return this.http.put<Trabajo>(this.basePath + '/trabajos/' + id, body, this.httpOptions).pipe(retry(2),catchError(this.handleError));
  }

  deleteTrabajo(IdTrabajo: number): Observable<Trabajo> {
    return this.http.delete<Trabajo>(this.basePath + '/trabajos/' + IdTrabajo, this.httpOptions).pipe(retry(2),catchError(this.handleError));
  }

/*============Fichajes===========*/
  getFichajesAll(): Observable<Fichaje[]> {
    return this.http.get<Fichaje[]>(this.basePath + '/fichajes').pipe(retry(2),catchError(this.handleError));
  }

  deleteFichaje(IdFichaje: number): Observable<Fichaje> {
    return this.http.delete<Fichaje>(this.basePath + '/fichajes/' + IdFichaje, this.httpOptions).pipe(retry(2),catchError(this.handleError));
  }
}
