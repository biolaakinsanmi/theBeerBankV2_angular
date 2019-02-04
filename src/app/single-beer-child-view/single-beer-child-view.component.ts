import { Component, OnInit, Input } from '@angular/core';
import { Beer } from './../_models/beer-model';
import { BeerService } from './../_services/beer.service';

@Component({
  selector: 'app-single-beer-child-view',
  templateUrl: './single-beer-child-view.component.html',
  styleUrls: ['./single-beer-child-view.component.css']
})
export class SingleBeerChildViewComponent implements OnInit {

  @Input() singleBeer:Beer;

  constructor() { }

  ngOnInit() {
    
  }

}
