import { SortOrder } from './enums';

export interface IHealthTip {
  type: string;
  id: number;
  title: string;
  text: string;
  upVotes: number;
  downVotes: number;
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
