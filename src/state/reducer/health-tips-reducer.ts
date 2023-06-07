import { createReducer, on } from '@ngrx/store';
import { IHealthTip, IHealthTipsState } from 'src/common/interfaces';
import {
  ApiErrorAction,
  loadHealthTipDetailActions,
  loadHealthTipsActions,
  loadedHealthTipDetailActions,
  loadedHealthTipsActions,
  loadedVoteHealthTipActions,
  voteHealthTipActions,
} from '../actions/health-tips.actions';

export const initialState: IHealthTipsState = {
  loading: false,
  allTips: [],
  error: null,
  selectedTip: <IHealthTip>{},
};

export const healthTipsReducer = createReducer(
  initialState,
  // List of tips
  on(loadHealthTipsActions.loadHealthTips, (state) => {
    return { ...state, loading: true };
  }),
  on(loadedHealthTipsActions.retrievedHealthTipsList, (state, { tips }) => {
    return { ...state, loading: false, allTips: tips };
  }),
  // Selected tip
  on(loadHealthTipDetailActions.loadHealthTipDetail, (state) => {
    return { ...state, loading: true };
  }),
  on(
    loadedHealthTipDetailActions.retrievedHealthTipDetail,
    (state, { tip }) => {
      return { ...state, loading: false, selectedTip: tip };
    }
  ),
  //Vote UP/DOWN tip
  on(voteHealthTipActions.voteDown, (state) => {
    return { ...state, loading: true };
  }),
  on(voteHealthTipActions.voteUP, (state) => {
    return { ...state, loading: true };
  }),
  on(loadedVoteHealthTipActions.tipVotedDown, (state, { updatedTip }) => {
    return {
      ...state,
      loading: false,
      allTips: state.allTips.map((tip: IHealthTip) =>
        tip.id === updatedTip.id ? updatedTip : tip
      ),
      selectedTip: updatedTip,
    };
  }),
  on(loadedVoteHealthTipActions.tipVotedUP, (state, { updatedTip }) => {
    return {
      ...state,
      loading: false,
      allTips: state.allTips.map((tip: IHealthTip) =>
        tip.id === updatedTip.id ? updatedTip : tip
      ),
      selectedTip: updatedTip,
    };
  }),
  on(ApiErrorAction.apiError, (state, { error }) => {
    return { ...state, error, loading: false };
  })
);
