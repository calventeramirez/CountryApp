import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl:string = "https://restcountries.com/v3.1"

  constructor(private http: HttpClient) {

  }

  searchCapital(query: string): Observable<Country[]>{
    const url = this.apiUrl+"/capital/"+query;
    return this.http.get<Country[]>(url).pipe(
      catchError(error => of([])) //Esto se usa para cuando se de un error en la busqueda este reinicie la pestaña y quede de inicio y en consola mostrara el error
    );
  }

  searchCountry(query: string): Observable<Country[]>{
    const url = this.apiUrl+"/name/"+query;  
    return this.http.get<Country[]>(url).pipe(catchError(error => of([])));
  }

  searchRegion(query: string): Observable<Country[]>{
    const url = this.apiUrl+"/region/"+query;
    return this.http.get<Country[]>(url).pipe(catchError(error => of([])));
  }
}
