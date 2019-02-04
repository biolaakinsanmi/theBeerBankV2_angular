import { ValueUnit } from './value-unit-interface';

export interface BeerNameAmount {
  name: string;
  amount: ValueUnit;
  add?: string;
  attribute?: string;
}