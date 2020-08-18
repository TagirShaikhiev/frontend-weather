import { PlaceInfo } from "./listOfPlaces"
import { observable, computed, action } from 'mobx'
import { observer } from "mobx-react";
import React from "react";
import { networkService } from "./Info"
import { Place } from './place'
import { allPlaces } from "./Places";

type PlaceWithTemp = {
    Place: string;
    temp: number;
}

export class listOfCurrentPlace {

    @observable 
    private PlaceInfo: PlaceInfo[] = [];

    @observable 
    private personalPlaces: Place[] = []; 
    
    @observable 
    private allPlaces: Place[] = [];

    @observable 
    private search: Place[] = []; 

    @observable
    private _searchTerm: string = '';

    @observable
    private _sorting: String = '';
    
    @observable currentPlace: Place = this.search[0];

    @observable
    private arrayOfPlaces: String = '';

    @computed
    get returnCurrentPlace(): Place {
        return this.currentPlace;
    } 

    @computed
    get sorting(): String | null {
        return this._sorting;
    } 
    
    @computed
    get arrayOfPersonalPlaces(): Place[] {
        return this.personalPlaces;
    }

    @computed
    get getAllPlaces(): Place[] {
        return this.allPlaces;
    }  

    @computed 
    get searchPlaces(): Place[] {
    
        let copy = [...this.allPlaces];
        if (this._searchTerm.length > 2 && copy.length > 0) {
            return copy.filter(person => person.name.toLowerCase().includes(this._searchTerm.toLowerCase()));
        } else {
            return this.search;
        }
    }

    @action
    async init() {
        this.allPlaces = allPlaces;
        this.getLocalStorage();
        this.getInfoOfWeather();
    }

    @action
    setSearch(search: string) {
        this._searchTerm = search;
    }

    @action
    setCurrentPlace (place: Place) { 
        this.currentPlace = place;
    }

    @action
    changeCurrentPlace(place: string) { 
        const curpls = this.allPlaces.filter((elem) => elem.name === place)![0];
        if (this.personalPlaces.filter((elem) => elem.name === place).length === 0 && curpls !== null) {
            this.currentPlace = curpls;
        }
    }

    @action
    addCurrentPlace() { 
        if (this.currentPlace !== null && this.personalPlaces.filter((elem) => elem === this.currentPlace).length === 0) {
            this.personalPlaces.push(this.currentPlace);
            this.setLocalStorage();
        }   
    }

    @action
    setLocalStorage() {
        localStorage.setItem('weather', JSON.stringify(this.personalPlaces));
    }

    @action
    getLocalStorage() {
        const key = localStorage.getItem('weather');
        this.personalPlaces = key !== null ? JSON.parse(key) : [];
    }

    @action 
    async getInfoOfWeather() {
        for (let i = 0; i < this.personalPlaces.length; i++) {
            const newInfo  = await networkService.get<PlaceInfo>(this.personalPlaces[i]!.id);
            this.PlaceInfo.push(newInfo);      
        }
    }

    @action
    getTempurature(id: number) {
        return (this.PlaceInfo.find(elem => elem.id === id) !== undefined) ? this.PlaceInfo.find(elem => elem.id === id)!.main.temp : 0;      
    }

    @action
    deleteFromPlaces (id: number) {
        this.personalPlaces.filter((elem) => elem.id !== id);
        this.setLocalStorage();            
    }

}
