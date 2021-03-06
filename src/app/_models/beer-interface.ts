import { BeerMethod } from './beer-method-interface';
import { ValueUnit } from './value-unit-interface';
import { BeerNameAmount } from './beer_ingredients-name-amount-interface';



export interface Beer {
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

  isFavourite?: boolean;
}