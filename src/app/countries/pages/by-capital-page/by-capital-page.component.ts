import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
    selector: 'app-by-capital-page',
    templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent implements OnInit{ 
    public countries: Country[] = [];
    public isLoading: boolean = false;
    public initialValue:string = "";

    constructor(private countriesService: CountriesService){
    }

    ngOnInit(): void {
        this.countries = this.countriesService.store.byCapital.countries;
        this.initialValue =this.countriesService.store.byCapital.term;
    }

    searchByCapital(term: string){
        // console.log("desde byCapital:");
        // console.log({term});
        this.isLoading = true;
        this.countriesService.searchCapital(term).subscribe(countries => {this.countries = countries; this.isLoading = false;});
    }
}
