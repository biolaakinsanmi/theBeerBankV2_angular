import { Beer } from '../_models/beer-interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BeerService {

   
  private favouriteBeers : Array<number> = []; 

  constructor(
    private http: HttpClient
  ) { }
  /****Favourites *****/

  getFavouriteBeers(){
    return this.favouriteBeers;
  }

  addFavouriteBeer(newBeerId: number){
    this.favouriteBeers.push(newBeerId);
    return this.favouriteBeers;
  }

  removeFavouriteBeer(id: number){
    let index = this.favouriteBeers.indexOf(id);
    this.favouriteBeers.splice(index, 1)
    return this.favouriteBeers;
  }


  /*********** HTTP CALLS ******/
  searchBeerByName(query){
    if(!query){
      return of([])
    }
    return this.http.get(environment.apiUrl + 'beers?beer_name=' + query )
  }

  fetchBeers(page = 1, size = 25){
    return this.http.get(environment.apiUrl + 'beers?page=' + page + '&per_page=' + size)
  }

  fetchBeersByQuery(query){
    return this.http.get(environment.apiUrl + 'beers?' + query)
  }

  fetchBeersByIds(ids: string){
    return this.http.get(environment.apiUrl + 'beers?ids=' + ids)
  }

  /****utils ***/
  getRandomIndexes(maxIndex, count){
    let arr = []
    while(arr.length < count){
        var i = Math.floor(Math.random() * maxIndex) + 1;
        if(arr.indexOf(i) === -1) arr.push(i);
    }

    return arr;
  }

  getSuggestedBeers(beers:Array<Beer>, count: number){
    let indexes = this.getRandomIndexes(beers.length, count);
    
    let suggesteds: Array<Beer> = [];
    indexes.forEach(i => suggesteds.push(beers[i]));

    return suggesteds;
  }
}
