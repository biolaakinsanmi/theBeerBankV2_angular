import { Beer } from '../_models/beer-interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject, observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BeerService {

  
  private beers : Array<Beer> = []; 
  public _beers: BehaviorSubject<Array<Beer>> = new BehaviorSubject([]);

  constructor(
    private http: HttpClient
  ) { }

  getBeers(){
    return this._beers.asObservable();
  }

  addBeer(newBeer: Beer){
    this.beers.push(newBeer);
    return this._beers.next(Object.assign({}, this.beers));
  }


  /*********** HTTP CALLS ******/
  fetchBeers(page = 1, size = 25){
    this.http.get(environment.apiUrl + 'beers?page=' + page + '&per_page=' + size).subscribe(
      (response: any)=>{
        this.beers = response;
        this._beers.next(this.beers);
        return of(true);
      },
      (error)=>{
        return of(false);
      }
    )
  }

}
