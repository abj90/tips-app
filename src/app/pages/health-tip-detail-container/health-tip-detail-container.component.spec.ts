import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { HealthTipDetailContainerComponent } from './health-tip-detail-container.component';

import healthTipMock from '../../../test/mocks/health-tip.mock.json';
import { AppState, IHealthTip } from 'src/common/interfaces';
import {
  selectLoading,
  selectTipDetail,
  selectTipFromStore,
} from 'src/state/selectors/health-tips.selectors';
import { voteHealthTipActions } from 'src/state/actions/health-tips.actions';
import { voteType } from 'src/common/enums';

describe('HealthTipDetailContainerComponent', () => {
  let component: HealthTipDetailContainerComponent;
  let fixture: ComponentFixture<HealthTipDetailContainerComponent>;
  let mockActivatedRoute: any;
  let mockStore: Partial<Store<AppState>>;
  let mockLocation: Partial<Location>;

  const mockTipId = 3001;
  const mockHealthTip: IHealthTip = healthTipMock;

  beforeEach(() => {
    mockActivatedRoute = {
      paramMap: of({ get: (param: string) => String(mockTipId) }),
    };

    mockStore = {
      select: jasmine.createSpy('select').and.callFake((selector: any) => {
        if (selector === selectLoading) {
          return of(false);
        } else if (selector === selectTipFromStore) {
          return of(mockHealthTip);
        } else if (selector === selectTipDetail) {
          return of(mockHealthTip);
        }
        return new Observable();
      }),
      dispatch: jasmine.createSpy('dispatch'),
    };

    mockLocation = {
      back: jasmine.createSpy('back'),
    };

    TestBed.configureTestingModule({
      declarations: [HealthTipDetailContainerComponent],
      imports: [StoreModule.forRoot({})], // Add your app state here
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Store, useValue: mockStore },
        { provide: Location, useValue: mockLocation },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HealthTipDetailContainerComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set loading correctly on ngOnInit', () => {
    component.ngOnInit();

    expect(component.loading$).toBeDefined();
    component.loading$.subscribe((loading) => {
      expect(loading).toBe(false);
    });
  });

  it('should set the health tip ID correctly on ngOnInit', () => {
    component.ngOnInit();
    expect(component.tipId).toBe(mockTipId);
  });

  it('should set the health tip ID correctly when calling setHealthTipId', () => {
    component.setHealthTipId();
    expect(component.tipId).toBe(mockTipId);
  });

  it('should go back when calling goBack', () => {
    component.goBack();
    expect(mockLocation.back).toHaveBeenCalled();
  });

  it('should dispatch the vote UP action when calling voteUp', () => {
    component.voteUp(mockTipId);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      voteHealthTipActions.voteUP({ tipId: mockTipId, vote: voteType.UP })
    );
  });

  it('should dispatch the vote DOWN action when calling voteDown', () => {
    component.voteDown(mockTipId);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      voteHealthTipActions.voteDown({
        tipId: mockTipId,
        vote: voteType.DOWN,
      })
    );
  });
});
