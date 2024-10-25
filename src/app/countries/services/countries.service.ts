import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { Stores } from '../interfaces/stores.interface';
import { Regiones } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl:string = "https://restcountries.com/v3.1"
  public store: Stores = {
    byCapital: {term: '', countries:[]},
    byCountries: {term: '', countries:[]},
    byRegion: {region: '', countries:[]},
  };

  constructor(private http: HttpClient) {
    this.cargarEnLocalStorage();
  }

  private guardarEnLocalStorage(){
    localStorage.setItem("store", JSON.stringify(this.store));
  }

  private cargarEnLocalStorage(){
    if(!localStorage.getItem("store")) return;

    this.store = JSON.parse(localStorage.getItem("store")!); 
  }

  private getCountriesRequest(url: string): Observable<Country[]>{
    return this.http.get<Country[]>(url).pipe(
      catchError(()=> of([])),//Esto se usa para cuando se de un error en la busqueda este reinicie la pestaña y quede de inicio y en consola mostrara el error
      // delay(2000),
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
    return this.getCountriesRequest(url).pipe(
      tap(countries =>this.store.byCapital = {term: query, countries}),
      tap(() => this.guardarEnLocalStorage())
    );
  }

  searchCountry(query: string): Observable<Country[]>{
    const url = this.apiUrl+"/name/"+query;  
    return this.getCountriesRequest(url).pipe(
      tap(countries => this.store.byCountries = {term:query, countries}),
      tap(()=> this.guardarEnLocalStorage())
    );
  }

  searchRegion(query: Regiones): Observable<Country[]>{
    const url = this.apiUrl+"/region/"+query;
    return this.getCountriesRequest(url).pipe(
      tap(regiones => this.store.byRegion = {region:query, countries: regiones}),
      tap(()=>this.guardarEnLocalStorage())
    );
  }
}
