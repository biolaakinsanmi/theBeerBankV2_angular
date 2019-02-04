import { BeerService } from './_services/beer.service';
import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs'
import { Beer } from './_models/beer-model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

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
