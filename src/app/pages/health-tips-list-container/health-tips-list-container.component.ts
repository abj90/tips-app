import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, IHealthTip, IHealthTipParams } from 'src/common/interfaces';
import {
  selectHealthTips,
  selectLoading,
} from 'src/state/selectors/health-tips.selectors';
import { loadHealthTipsActions } from '../../../state/actions/health-tips.actions';
import { isAfter, isBefore, isSameDay } from 'src/common/functions';
import { START_OF_WEEK, TODAY, healthTipParams } from 'src/common/constants';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ColumnDef } from 'src/common/enums';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-health-tips-list-container',
  templateUrl: './health-tips-list-container.component.html',
  styleUrls: ['./health-tips-list-container.component.scss'],
})
export class HealthTipsListContainerComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  public loading$: Observable<boolean> = new Observable();
  public dataSource$: Observable<IHealthTip[]> = new Observable();
  public displayedColumns: ColumnDef[] = [
    ColumnDef.DATE,
    ColumnDef.TITLE,
    ColumnDef.TEXT,
    ColumnDef.UP_VOTES,
    ColumnDef.DOWN_VOTES,
  ];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.dispatchSourData(healthTipParams);
    this.setLoading();
    this.setHealthTips();
  }

  dispatchSourData(params: IHealthTipParams): void {
    this.store.dispatch(loadHealthTipsActions.loadHealthTips({ params }));
  }

  setLoading(): void {
    this.loading$ = this.store.select(selectLoading);
  }

  setHealthTips(): void {
    this.dataSource$ = this.store.select(selectHealthTips);
  }

  announceSortChange({ active, direction }: Sort): void {
    const isClearState = direction === '';
    const sortStateParam = isClearState
      ? healthTipParams
      : {
          ...healthTipParams,
          _sort: active,
          _order: direction,
        };
    this.dispatchSourData(sortStateParam);
  }
}
