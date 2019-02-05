import { BeerService } from './../_services/beer.service';
import { Beer } from './../_models/beer-interface';
import { Component, OnInit } from '@angular/core';

declare var $:any;

interface beerFilter{
  name: string,
  label: string,
  pattern?: string,
  value: string,
  hint: string,
  required?: boolean
}

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent implements OnInit {
  constructor(
    private beerService: BeerService,
  ) { }

  
  public beerResults: Array<Beer> = [];
  public viewedBeer: Beer;
  public buttonDisabled: Boolean = true;
  

  public filterFields: Array<beerFilter> = [
    {
      name: "beer_name",
      label: "Beer Name",
      value: null,
      pattern: '([A-Za-z0-9]+){3,10}',
      hint: "Enter valid name"
    },
    {
      name: "abv_gt",
      label: "Min ABV",
      value: null,
      pattern: '[0-9]+(\.[0-9])?',
      hint: "Enter valid number"
    },
    {
      name: "abv_lt",
      label: "Max ABV",
      value: null,
      pattern: '[0-9]+(\.[0-9])?',
      hint: "Enter valid number"
    },
    {
      name: "ibu_gt",
      label: "Min IBU",
      value: null,
      pattern: '[0-9]+(\.[0-9])?',
      hint: "Enter valid decimal"
    },
    {
      name: "ibu_lt",
      label: "Max IBU",
      value: null,
      pattern: '[0-9]+(\.[0-9])?',
      hint: "Enter valid number"
    },
    {
      name: "ebc_gt",
      label: "Min EBC",
      value: null,
      pattern: '[0-9]+(\.[0-9])?',
      hint: "Enter valid number"
    },
    {
      name: "ebc_lt",
      label: "Max EBC",
      value: null,
      pattern: '[0-9]+(\.[0-9])?',
      hint: "Enter valid number"
    },
    {
      name: "brewed_before",
      label: "Brewed Before",
      value: null,
      pattern: '(0[1-9]|10|11|12)-([1][9]|[2][0])[0-9]{2}$',
      hint: "Enter date as dd-yyyy"
    },
    {
      name: "brewed_after",
      label: "Brewed After",
      value: null,
      pattern: '(0[1-9]|10|11|12)-([1][9]|[2][0])[0-9]{2}$',
      hint: "Enter date as dd-yyyy"
    }
    /*{
      name: "yeast",
      label: "Yeast",
      value: null,
      pattern: '[0-9]+(\.[0-9])?',
      hint: "Enter valid number"
    },
    {
      name: "hops",
      label: "Hops",
      value: null,
      pattern: '([A-Za-z0-9]+){3,10}',
      hint: "Enter valid hops name"
    },
    {
      name: "malt",
      label: "Malt",
      value: null,
      pattern: '([A-Za-z0-9]+){3,10}',
      hint: "Enter valid malt name"
    },
    {
      name: "food",
      label: "Food",
      value: null,
      pattern: '([A-Za-z0-9]+){3,10}',
      hint: "Enter valid food name"
    }*/
  ]

  ngOnInit(){

  }

  filterBeersList(){
    let query = this.makeFilterQuery();

    if(!query){
      alert("Enter some filter values.");
      return;
    }

    this.beerService.fetchBeersByQuery(query).subscribe(
      (response: any)=>{
        this.parseFavouritesThenAdd(response);
      },
      (error)=>{

      }
    )
  }

  makeFilterQuery(){
    let queryString: string = "";
    this.filterFields.forEach(
      field => {
        if(field.value){
          queryString += field.name + "=" + field.value+ "&";
        }
      }
    );

    return queryString;
  }

  parseFavouritesThenAdd(beersToParse: Array<Beer>){
    this.beerResults = [];

    const favourites = this.beerService.getFavouriteBeers();

    beersToParse.forEach(
      beer => {
        beer.isFavourite = favourites.includes(beer.id)? true : false;
        this.beerResults.push(beer);
      }
    )

  }

  updateFavourite(beer: Beer, index){
    if(beer.isFavourite){
      this.beerService.removeFavouriteBeer(beer.id);
      this.beerResults[index].isFavourite = false;
    }
    else{
      this.beerService.addFavouriteBeer(beer.id);
      this.beerResults[index].isFavourite = true;
    }
  }

  showModal(beer: Beer){
    this.viewedBeer = beer;
    $('#viewBeerModal').modal({
      show: true,
      focus: true
    })
  }

}
