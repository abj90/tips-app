import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';

import { AppState, IHealthTip, IHealthTipParams } from 'src/common/interfaces';
import {
  selectHealthTips,
  selectLoading,
} from 'src/state/selectors/health-tips.selectors';
import {
  loadCreateHealthActions,
  loadHealthTipsActions,
  loadRemoveHealthActions,
} from '../../../state/actions/health-tips.actions';
import { NEW_TIP, healthTipParams } from 'src/common/constants';

import { ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { ColumnDef } from 'src/common/enums';

import { MatDialog } from '@angular/material/dialog';
import { CreateTipModalComponent } from 'src/app/components/create-tip-modal/create-tip-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-health-tips-list-container',
  templateUrl: './health-tips-list-container.component.html',
  styleUrls: ['./health-tips-list-container.component.scss'],
})
export class HealthTipsListContainerComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  public loading$: Observable<boolean> = new Observable();
  public loading: boolean = false;
  public dataSource$: Observable<IHealthTip[]> = new Observable();
  public displayedColumns: ColumnDef[] = [
    ColumnDef.DATE,
    ColumnDef.TITLE,
    ColumnDef.TEXT,
    ColumnDef.ACTIONS,
  ];
  public requestParams = healthTipParams;

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dispatchSourData(this.requestParams);
    this.setLoading();
    this.setHealthTips();
  }

  dispatchSourData(params: IHealthTipParams): void {
    this.store.dispatch(loadHealthTipsActions.loadHealthTips({ params }));
  }

  setLoading(): void {
    this.store.select(selectLoading).subscribe({
      next: (res) => {
        this.loading = res;
      },
    });
  }

  setHealthTips(): void {
    this.dataSource$ = this.store
      .select(selectHealthTips)
      .pipe(tap((res) => console.log('__res', res)));
  }

  announceSortChange({ active, direction }: Sort): void {
    const isClearState = direction === '';
    this.requestParams = isClearState
      ? { ...this.requestParams, _order: '', _sort: '' }
      : {
          ...this.requestParams,
          _sort: active,
          _order: direction,
        };
    this.dispatchSourData(this.requestParams);
  }

  onSearch(inputValue: string): void {
    this.requestParams = { ...this.requestParams, q: inputValue };
    this.dispatchSourData({ ...this.requestParams, q: inputValue });
  }

  removeTip(id: number): void {
    this.store.dispatch(
      loadRemoveHealthActions.loadRemoveHealthTip({ tipId: id })
    );
  }

  updateTip(id: number): void {
    this.router.navigate(['/health-tip', id]);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTipModalComponent, {
      data: NEW_TIP,
    });

    dialogRef.afterClosed().subscribe((result) => {
      result &&
        this.store.dispatch(
          loadCreateHealthActions.loadCreateHealthTip({ newTip: result?.data })
        );
    });
  }
}
