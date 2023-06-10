import { createSelector, createFeatureSelector } from '@ngrx/store';
import { HEALTH_TIPS } from 'src/common/constants';
import { IHealthTipsState } from 'src/common/interfaces';

export const selectHealthTipsFeature =
  createFeatureSelector<IHealthTipsState>(HEALTH_TIPS);

export const selectHealthTips = createSelector(
  selectHealthTipsFeature,
  (state: IHealthTipsState) => state.allTips
);

export const selectLoading = createSelector(
  selectHealthTipsFeature,
  (state: IHealthTipsState) => state.loading
);

export const selectTipFromStore = createSelector(
  selectHealthTipsFeature,
  (state: IHealthTipsState, props: { tipId: number }) =>
    state.allTips.find((item) => item.id === props.tipId)
);

export const selectTipDetail = createSelector(
  selectHealthTipsFeature,
  (state: IHealthTipsState) => state.selectedTip
);
