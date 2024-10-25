import { Country } from "./country";
import { Regiones } from "./region.type";

export interface Stores {
    byCapital: TermCountries;
    byCountries: TermCountries;
    byRegion: RegionCountries;
}

export interface TermCountries {
    term: string;
    countries: Country[];
}

export interface RegionCountries {
    region: Regiones;
    countries: Country[];
}