import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  
  baseUri:string = 'http://localhost:1234/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }


  // Get all fruits
  getAllFruits() {
    return this.http.get(`${this.baseUri}/getAllFruits`)
    .pipe(
      catchError(this.errorMgmt)
    );
  }

  getFruit(name:string){
    return this.http.get(`${this.baseUri}/getfruit/${name}`)
    .pipe(
      catchError(this.errorMgmt)
    );
  }

  addFruitsToCart(data:any){
    return this.http.post(`${this.baseUri}/purchase`, data)
    .pipe(
      catchError(this.errorMgmt)
    )
  }

    // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}