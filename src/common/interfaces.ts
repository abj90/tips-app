import { SortOrder } from './enums';

export interface IHealthTip {
  id?: number;
  title: string;
  text: string;
  datetime: string;
}

export interface IHealthTipCard extends IHealthTip {
  cardColor: string;
}

export interface IHealthTipsState {
  loading: boolean;
  allTips: IHealthTip[];
  error: any;
  selectedTip: IHealthTip;
}

export interface AppState {
  healthTips: IHealthTipsState;
}

export interface IHealthTipParams {
  q: string;
  _sort: string;
  _order: SortOrder | string;
}
