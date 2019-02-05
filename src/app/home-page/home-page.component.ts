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

  public isLoadingBeers: Boolean = false;
  
  public searchQuery: FormControl = new FormControl();

  ngOnInit(){
    //subscribe to input field changes
    this.searchQuery.valueChanges.pipe(  
      debounceTime(200),    //delay by 200ms for changes
      distinctUntilChanged(),  //ingnore similar emits
      switchMap((query) =>  this.beerService.searchBeerByName(query))  //trigger search on every query
    )
    .subscribe( (result:Array<Beer>) => 
    {
      if(result.length < 1 && !this.searchQuery.value){
        this.fetchBeersList();  //reset beers list to alll beers, when inout bix is cleared
      }
      else{
        this.parseFavouritesThenAdd(result); //parse received beers to map against favourites
      }
    });

    //init withfething all beers
    this.fetchBeersList();  
  }

  fetchBeersList(page = this.page, size = this.size){
    this.isLoadingBeers = true; //init spinner
    page = page >= 1 ? page : 1; //also helps when page is reloaded when scroll is at bottom.
    this.beerService.fetchBeers(page, size).subscribe(
      (response: any)=>{
        this.parseFavouritesThenAdd(response); //parse received beers to map against favourites
        this.isLoadingBeers = false; //hide spinner
      },
      (error)=>{
        alert("Can't fetch Beers.") //can addd more error handling
        this.isLoadingBeers = false;
      }
    )
  }

  parseFavouritesThenAdd(beersToParse: Array<Beer>){
    const favourites = this.beerService.getFavouriteBeers(); //get favourites indexes in service

    beersToParse.map(
      beer => {
        beer.isFavourite = favourites.includes(beer.id)? true : false; //add is favourite flag to favourites 
        return beer;
      }
    )

    if(this.page == 1){
      this.beers = beersToParse;  //if page number is1, cleer current beer list
    }
    else{
      this.beers = this.beers.concat(beersToParse);  //else add to current list
    }
  }


  ///handle add or remove favourite
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

  //open modal to show selected beer
  showModal(beer: Beer){
    this.viewdBeer = beer;
    $('#viewBeerModal').modal({
      show: true,
      focus: true
    })
  }

  onScroll(){  //handle scroll trigger
    this.page++;
    this.fetchBeersList();
  }

}
