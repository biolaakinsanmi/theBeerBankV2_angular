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
    console.log(this.favouriteBeers);
    return this.favouriteBeers;
  }

  removeFavouriteBeer(id: number){
    let index = this.favouriteBeers.indexOf(id);
    console.log("index remove", index);
    this.favouriteBeers.splice(index, 1)
    console.log(this.favouriteBeers);
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

  fetchBeersByIds(ids: string){
    return this.http.get(environment.apiUrl + 'beers?ids=' + ids)
  }
}
