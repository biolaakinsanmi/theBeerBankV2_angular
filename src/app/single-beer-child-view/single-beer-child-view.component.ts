import { Component, OnInit, Input } from '@angular/core';
import { Beer } from '../_models/beer-interface';
import { BeerService } from './../_services/beer.service';

@Component({
  selector: 'app-single-beer-child-view',
  templateUrl: './single-beer-child-view.component.html',
  styleUrls: ['./single-beer-child-view.component.css']
})
export class SingleBeerChildViewComponent implements OnInit {

  @Input() singleBeer:Beer;

  constructor(
    private beerService: BeerService
  ) { }

  private allBeers: Array<Beer>;
  public suggestedBeers: Array<Beer> = [];

  ngOnInit() {
    this.beerService.fetchBeers().subscribe(
      (response: any)=>{
        this.allBeers = response;
        this.getSuggestedBeers();
      },
      (error)=>{

      }
    )
  }

  getSuggestedBeers(){
    this.suggestedBeers = this.beerService.getSuggestedBeers(this.allBeers, 3);
  }

}
