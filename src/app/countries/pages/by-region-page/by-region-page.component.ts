import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { Regiones } from '../../interfaces/region.type';


@Component({
    selector: 'app-by-region-page',
    templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent implements OnInit{
    public countries: Country[] = [];
    public regions: Regiones[] = ["Africa", "America", "Asia", "Europe", "Oceania"];
    public seleccionado?: Regiones;

    constructor(private countriesService: CountriesService){
    }

    ngOnInit(): void {
        this.countries = this.countriesService.store.byRegion.countries;
        this.seleccionado = this.countriesService.store.byRegion.region;
    }
    
    searchByRegion(term: Regiones):void{
        // console.log("desde byCapital:");
        // console.log({term});
        this.seleccionado = term;
        this.countriesService.searchRegion(term).subscribe(countries => {this.countries = countries});
    }
 }
