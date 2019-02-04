import { Component, OnInit } from '@angular/core';
import { Beer } from '../_models/beer-interface';
import { BeerService } from './../_services/beer.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

declare var $:any;

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

  public beers: Array<Beer> = [];
  private page: number = 1;
  private size: number = 25;

  public viewdBeer: Beer;
  
  public searchQuery: FormControl = new FormControl();

  ngOnInit(){
    this.searchQuery.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((query) =>  this.beerService.searchBeerByName(query))
    )
    .subscribe( (result:Array<Beer>) => 
    {
      if(result.length < 1 && !this.searchQuery.value){
        this.fetchBeersList();
      }
      else{
        this.parseFavouritesThenAdd(result);
      }
    });

    this.fetchBeersList();
  }

  fetchBeersList(page = this.page, size = this.size){
    page = page >= 1 ? page : 1; //also helps when page is reloaded when scroll is at bottom.
    this.beerService.fetchBeers(page, size).subscribe(
      (response: any)=>{
        this.parseFavouritesThenAdd(response);
      },
      (error)=>{

      }
    )
  }

  parseFavouritesThenAdd(beersToParse: Array<Beer>){
    const favourites = this.beerService.getFavouriteBeers();

    beersToParse.map(
      beer => {
        beer.isFavourite = favourites.includes(beer.id)? true : false;
        return beer;
      }
    )

    if(this.page == 1){
      this.beers = beersToParse;
    }
    else{
      this.beers = this.beers.concat(beersToParse);
    }
  }

  updateFavourite(beer: Beer, index){
    if(beer.isFavourite){
      this.beerService.removeFavouriteBeer(beer.id);
      this.beers[index].isFavourite = false;
    }
    else{
      this.beerService.addFavouriteBeer(beer.id);
      this.beers[index].isFavourite = true;
    }
  }

  showModal(beer: Beer){
    this.viewdBeer = beer;
    $('#viewBeerModal').modal({
      show: true,
      focus: true
    })
  }

  onScroll(){
    console.log("Scrolled");
    this.page++;
    this.fetchBeersList();
  }

}
