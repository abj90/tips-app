import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { HealthTipsListContainerComponent } from './health-tips-list-container.component';
import { loadHealthTipsActions } from 'src/state/actions/health-tips.actions';
import { of } from 'rxjs';

import mockHealthTipsList from '../../../test/mocks/health-tip-list.mock.json';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'search-bar',
  template: '',
})
class MockSearchBarComponent {}

describe('HealthTipsListContainerComponent', () => {
  let component: HealthTipsListContainerComponent;
  let fixture: ComponentFixture<HealthTipsListContainerComponent>;
  let mockStore: jasmine.SpyObj<Store<any>>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockStore = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), MatDialogModule],
      declarations: [HealthTipsListContainerComponent, MockSearchBarComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: MatDialog, useValue: mockDialog },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthTipsListContainerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadHealthTips action on ngOnInit', () => {
    const mockParams = {
      q: '',
      _sort: '',
      _order: '',
    };
    component.requestParams = mockParams;
    mockStore.select.and.returnValue(of(true));
    component.ngOnInit();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      loadHealthTipsActions.loadHealthTips({ params: mockParams })
    );
  });

  it('should set loading property based on store selectLoading', () => {
    const mockLoading = true;
    mockStore.select.and.returnValue(of(mockLoading));
    component.setLoading();
    expect(component.loading).toBe(mockLoading);
  });

  it('should set dataSource$ based on store selectHealthTips', () => {
    const mockHealthTips = mockHealthTipsList;
    mockStore.select.and.returnValue(of(mockHealthTips));
    component.setHealthTips();
    expect(component.dataSource$).toBeDefined();
  });

  it('should update requestParams and dispatch loadHealthTips action on announceSortChange', () => {
    const mockSort: Sort = { active: 'datetime', direction: 'asc' };
    const mockParams = {
      q: '',
      _sort: '',
      _order: '',
    };
    component.requestParams = mockParams;
    component.announceSortChange(mockSort);

    expect(component.requestParams).toEqual({
      ...mockParams,
      _sort: mockSort.active,
      _order: mockSort.direction,
    });
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      loadHealthTipsActions.loadHealthTips({ params: component.requestParams })
    );
  });

  it('should update requestParams and dispatch loadHealthTips action on onSearch', () => {
    const inputValue = 'search query';
    const mockParams = {
      q: '',
      _sort: '',
      _order: '',
    };
    component.requestParams = mockParams;

    component.onSearch(inputValue);

    expect(component.requestParams.q).toEqual(inputValue);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      loadHealthTipsActions.loadHealthTips({ params: component.requestParams })
    );
  });
});
