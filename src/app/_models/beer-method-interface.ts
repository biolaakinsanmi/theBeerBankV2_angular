import { BeerMethodTempDuration } from './beer-method-temp-duration-interface';

export interface BeerMethod{

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