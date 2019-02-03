import { BeerMethod } from './beer-method-model';
import { ValueUnit } from './value-unit-model';
import { BeerNameAmount } from './beer_ingredients-name-amount-method';



export class Beer {
  constructor(){

  }

  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;

  volume: ValueUnit;

  boil_volume: ValueUnit;

  method: BeerMethod;

  ingredients: {
    malt: Array<BeerNameAmount>,
    hops: Array<BeerNameAmount>;

    yeast: string;
  };

  food_pairing: Array<string>;
  brewers_tips: string;
  contributed_by: string;
}