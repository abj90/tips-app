import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../common/interfaces';
import { healthTipsReducer } from './reducer/health-tips-reducer';

export const ROOT_REDUCER: ActionReducerMap<AppState> = {
  healthTips: healthTipsReducer,
};
