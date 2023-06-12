import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';

import { HealthTipsService } from 'src/services/health-tips.service';
import {
  ApiErrorAction,
  loadCreateHealthActions,
  loadHealthTipDetailActions,
  loadHealthTipsActions,
  loadRemoveHealthActions,
  loadUpdateHealthActions,
  loadedCreateHealthActions,
  loadedHealthTipDetailActions,
  loadedHealthTipsActions,
  loadedRemoveHealthActions,
  loadedUpdateHealthActions,
} from '../actions/health-tips.actions';
import { AppState, IHealthTip } from 'src/common/interfaces';

@Injectable()
export class HealthTipsEffects {
  loadTips$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadHealthTipsActions.loadHealthTips),
      exhaustMap(({ params }) => {
        return this.healthTipsService.getTips(params).pipe(
          map((tips) => {
            console.log('__tips', tips);
            return loadedHealthTipsActions.retrievedHealthTipsList({ tips });
          }),
          catchError((error) => of(ApiErrorAction.apiError({ error })))
        );
      })
    )
  );

  loadTipById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadHealthTipDetailActions.loadHealthTipDetail),
      exhaustMap(({ tipId }) => {
        return this.healthTipsService.getTipById(tipId).pipe(
          map((tip: IHealthTip) =>
            loadedHealthTipDetailActions.retrievedHealthTipDetail({ tip })
          ),
          catchError((error) => of(ApiErrorAction.apiError({ error })))
        );
      })
    )
  );

  removeTip$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRemoveHealthActions.loadRemoveHealthTip),
      exhaustMap(({ tipId }) => {
        return this.healthTipsService.removeTip(tipId).pipe(
          map(() =>
            loadedRemoveHealthActions.removeHealthTip({ removedTipId: tipId })
          ),
          catchError((error) => of(ApiErrorAction.apiError({ error })))
        );
      })
    )
  );

  createTip$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCreateHealthActions.loadCreateHealthTip),
      exhaustMap(({ newTip }) => {
        return this.healthTipsService.createTip(newTip).pipe(
          map((resp) =>
            loadedCreateHealthActions.createHealthTip({ newTip: resp })
          ),
          catchError((error) => of(ApiErrorAction.apiError({ error })))
        );
      })
    )
  );

  updateTip$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUpdateHealthActions.loadUpdateHealthTip),
      exhaustMap(({ updatedTip, tipId }) => {
        return this.healthTipsService.updateTip(updatedTip, tipId).pipe(
          map((resp) =>
            loadedUpdateHealthActions.updateHealthTip({ updatedTip: resp })
          ),
          catchError((error) => of(ApiErrorAction.apiError({ error })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private healthTipsService: HealthTipsService
  ) {}
}
