import { BeerMethodTempDuration } from './beer-method-temp-duration-model';

export class BeerMethod{
  constructor(){

  }

  mash_temp: [
    {
      mash_temp: Array<BeerMethodTempDuration>;
      fermentation: BeerMethodTempDuration;
      twist: BeerMethodTempDuration;
    }
  ];
  
  fermentation: BeerMethodTempDuration;

  twist: BeerMethodTempDuration
}