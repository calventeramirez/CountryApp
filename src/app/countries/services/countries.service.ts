import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl:string = "https://restcountries.com/v3.1"

  constructor(private http: HttpClient) {

  }

  private getCountriesRequest(url: string): Observable<Country[]>{
    return this.http.get<Country[]>(url).pipe(
      catchError(()=> of([])),//Esto se usa para cuando se de un error en la busqueda este reinicie la pestaña y quede de inicio y en consola mostrara el error
      delay(2000),
    );
  }

  searchCountryByAlphaCode(query:string): Observable<Country | null> {
    const url = this.apiUrl+"/alpha/"+query;
    return this.http.get<Country[]>(url).pipe(
      map(countries => countries.length > 0? countries[0]:null),
      catchError(error => of(null)));
  }

  searchCapital(query: string): Observable<Country[]>{
    const url = this.apiUrl+"/capital/"+query;
    return this.getCountriesRequest(url);
  }

  searchCountry(query: string): Observable<Country[]>{
    const url = this.apiUrl+"/name/"+query;  
    return this.getCountriesRequest(url);
  }

  searchRegion(query: string): Observable<Country[]>{
    const url = this.apiUrl+"/region/"+query;
    return this.getCountriesRequest(url);
  }
}
