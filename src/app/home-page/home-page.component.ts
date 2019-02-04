import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs'
import { Beer } from './../_models/beer-model';
import { BeerService } from './../_services/beer.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor (
    private beerService: BeerService
  ){

  }

  private beers$ : Subscription;
  public beers: Array<Beer> = [];
  private page: number = 1;
  private size: number = 25;

  ngOnInit(){
    this.beers$ = this.beerService._beers.subscribe(
      (beersList) => {
        this.beers = beersList;
        console.log(beersList);
      }
    )

    this.fetchBeersList();
  }

  fetchBeersList(){
    this.beerService.fetchBeers()
  }

}
