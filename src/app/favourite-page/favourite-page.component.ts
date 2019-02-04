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

  public favouriteBeersList: Array<number>;
  public favouriteBeers: Array<Beer>;
  public viewedBeer: Beer;

  ngOnInit() {
    this.getFavouriteBeers();
  }

  
  getFavouriteBeers(){
    this.favouriteBeersList = this.beerService.getFavouriteBeers();
    console.log("favouriteBeersList", this.favouriteBeersList)

    this.beerService.fetchBeersByIds(this.favouriteBeersList.join("|")).subscribe(
      (response: any)=>{
        response.map(
          (beer: Beer) => {
            beer.isFavourite = true;
            return beer;
          }
        )
        this.favouriteBeers = response;
      },
      (error)=>{

      }
    )
  }
  
  removeFavourite(beer: Beer, index){
    this.favouriteBeersList = this.beerService.removeFavouriteBeer(beer.id);
    this.favouriteBeers.splice(index, 1);
  }

  showModal(beer){
    this.viewedBeer = beer;
    $('#viewBeerModal').modal({
      show: true,
      focus: true
    })
  }

}
