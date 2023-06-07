import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, withLatestFrom } from 'rxjs/operators';

import { HealthTipsService } from 'src/services/health-tips.service';
import {
  ApiErrorAction,
  loadHealthTipDetailActions,
  loadHealthTipsActions,
  loadedHealthTipDetailActions,
  loadedHealthTipsActions,
  loadedVoteHealthTipActions,
  voteHealthTipActions,
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

  voteUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(voteHealthTipActions.voteUP),
      exhaustMap(({ tipId, vote }) => {
        return this.healthTipsService.voteHealthTip(tipId, vote).pipe(
          map((updatedTip: IHealthTip) =>
            loadedVoteHealthTipActions.tipVotedUP({ updatedTip })
          ),
          catchError((error) => of(ApiErrorAction.apiError({ error })))
        );
      })
    )
  );

  voteDown$ = createEffect(() =>
    this.actions$.pipe(
      ofType(voteHealthTipActions.voteDown),
      exhaustMap(({ tipId, vote }) => {
        return this.healthTipsService.voteHealthTip(tipId, vote).pipe(
          map((updatedTip: IHealthTip) =>
            loadedVoteHealthTipActions.tipVotedDown({ updatedTip })
          ),
          catchError((error) => of(ApiErrorAction.apiError({ error })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private healthTipsService: HealthTipsService,
    private store$: Store<AppState>
  ) {}
}
