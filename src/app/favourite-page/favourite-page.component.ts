import { Beer } from '../_models/beer-interface';
import { BeerService } from './../_services/beer.service';
import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
  selector: 'app-favourite-page',
  templateUrl: './favourite-page.component.html',
  styleUrls: ['./favourite-page.component.css']
})
export class FavouritePageComponent implements OnInit {

  constructor(
    private beerService: BeerService
  ) { }

  public favouriteBeersList: Array<number> = [];
  public favouriteBeers: Array<Beer> = [];
  public viewedBeer: Beer;

  public isFetchingBeers: Boolean = false;

  ngOnInit() {
    this.getFavouriteBeers(); //init with getting favourites
  }

  
  getFavouriteBeers(){ //favourtie beers
    this.favouriteBeersList = this.beerService.getFavouriteBeers(); //get saved Ids of favourite beers from service

    this.isFetchingBeers = true;
    this.beerService.fetchBeersByIds(this.favouriteBeersList.join("|")).subscribe( //retrieve beers by Ids
      (response: any)=>{
        response.map(
          (beer: Beer) => {
            beer.isFavourite = true;
            return beer;
          }
        )
        this.favouriteBeers = response;
        this.isFetchingBeers = false;
      },
      (error)=>{
        alert("Can't fetch errors") //can add more error handling based on server responses
        this.isFetchingBeers = false;
      }
    )
  }
  
  removeFavourite(beer: Beer, index){   //remove beer from favourite
    this.favouriteBeersList = this.beerService.removeFavouriteBeer(beer.id);
    this.favouriteBeers.splice(index, 1);
  }

  showModal(beer: Beer){ //show clicked beer in modal
    this.viewedBeer = beer;
    $('#viewBeerModal').modal({
      show: true,
      focus: true
    })
  }

}
