import { createActionGroup, props } from '@ngrx/store';
import { voteType } from 'src/common/enums';
import { IHealthTip, IHealthTipParams } from 'src/common/interfaces';

// Get list of health tip
export const loadHealthTipsActions = createActionGroup({
  source: 'Health Tips',
  events: {
    'Load Health Tips': props<{ params: IHealthTipParams }>(),
  },
});

export const loadedHealthTipsActions = createActionGroup({
  source: 'Health Tips',
  events: {
    'Retrieved Health Tips List': props<{ tips: IHealthTip[] }>(),
  },
});
// Get tip by id
export const loadHealthTipDetailActions = createActionGroup({
  source: 'Health Tips Detail',
  events: {
    'Load Health Tip Detail': props<{ tipId: number }>(),
  },
});

export const loadedHealthTipDetailActions = createActionGroup({
  source: 'Health Tips Detail',
  events: {
    'Retrieved Health Tip Detail': props<{ tip: IHealthTip }>(),
  },
});

// Remove Tip
export const loadRemoveHealthActions = createActionGroup({
  source: 'Remove Health Tip',
  events: {
    'Load Remove Health Tip': props<{ tipId: number }>(),
  },
});

export const loadedRemoveHealthActions = createActionGroup({
  source: 'Remove Health Tip',
  events: {
    'Remove Health Tip': props<{ removedTipId: number }>(),
  },
});
// Create Tip
export const loadCreateHealthActions = createActionGroup({
  source: 'Create Health Tip',
  events: {
    'Load Create Health Tip': props<{ newTip: IHealthTip }>(),
  },
});

export const loadedCreateHealthActions = createActionGroup({
  source: 'Create Health Tip',
  events: {
    'Create Health Tip': props<{ newTip: IHealthTip }>(),
  },
});

// Update Tip
export const loadUpdateHealthActions = createActionGroup({
  source: 'Update Health Tip',
  events: {
    'Load Update Health Tip': props<{ updatedTip: IHealthTip }>(),
  },
});

export const loadedUpdateHealthActions = createActionGroup({
  source: 'Update Health Tip',
  events: {
    'Update Health Tip': props<{ updatedTip: IHealthTip }>(),
  },
});

// Error loading
export const ApiErrorAction = createActionGroup({
  source: 'Api Error',
  events: {
    'Api Error': props<{ error: any }>(),
  },
});
