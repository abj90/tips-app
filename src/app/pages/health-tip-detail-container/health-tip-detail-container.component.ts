import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

import { AppState, IHealthTip } from 'src/common/interfaces';
import {
  loadHealthTipDetailActions,
  loadUpdateHealthActions,
} from 'src/state/actions/health-tips.actions';
import {
  selectLoading,
  selectTipDetail,
  selectTipFromStore,
} from 'src/state/selectors/health-tips.selectors';
import { ID } from 'src/common/constants';

@Component({
  selector: 'app-health-tip-detail-container',
  templateUrl: './health-tip-detail-container.component.html',
  styleUrls: ['./health-tip-detail-container.component.scss'],
})
export class HealthTipDetailContainerComponent implements OnInit {
  public loading$: Observable<boolean> = new Observable();
  public tipId: number;
  public selectedTip: IHealthTip | undefined;
  public isUpdatedFormVisible: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.setLoading();
    this.setHealthTipId();
    this.setSelectedHealthTip();
  }

  setLoading(): void {
    this.loading$ = this.store.select(selectLoading);
  }

  setSelectedHealthTip(): void {
    this.store
      .select((state) => selectTipFromStore(state, { tipId: this.tipId }))
      .pipe(
        map((resp: IHealthTip | undefined) => {
          if (!resp) {
            this.setSelectedHealthTipFromApi();
          } else {
            this.selectedTip = resp;
          }
        })
      )
      .subscribe();
  }

  setSelectedHealthTipFromApi(): void {
    this.store.dispatch(
      loadHealthTipDetailActions.loadHealthTipDetail({ tipId: this.tipId })
    );
    this.store.select(selectTipDetail).subscribe({
      next: (resp: IHealthTip) => (this.selectedTip = resp),
      error: (error: any) => console.log('error', error),
    });
  }

  setHealthTipId(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.tipId = +params.get(ID)!;
    });
  }

  showOrHideTipForm(): void {
    this.isUpdatedFormVisible = !this.isUpdatedFormVisible;
  }

  submitForm(updatedTip: IHealthTip): void {
    this.store.dispatch(
      loadUpdateHealthActions.loadUpdateHealthTip({ updatedTip })
    );
    this.showOrHideTipForm();
  }

  goBack(): void {
    this.location.back();
  }
}
