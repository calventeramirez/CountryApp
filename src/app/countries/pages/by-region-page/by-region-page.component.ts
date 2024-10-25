import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

type Regiones = "Africa" | "America" | "Asia" | "Europe" | "Oceania";

@Component({
    selector: 'app-by-region-page',
    templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
    public countries: Country[] = [];
    public regions: Regiones[] = ["Africa", "America", "Asia", "Europe", "Oceania"];
    public seleccionado?: Regiones;

    constructor(private countriesService: CountriesService){
    }

    searchByRegion(term: Regiones):void{
        // console.log("desde byCapital:");
        // console.log({term});
        this.seleccionado = term;
        this.countriesService.searchRegion(term).subscribe(countries => {this.countries = countries});
    }
 }
