import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { HealthTipsListContainerComponent } from './health-tips-list-container.component';
import { IHealthTip } from 'src/common/interfaces';
import { loadHealthTipsActions } from 'src/state/actions/health-tips.actions';
import { of } from 'rxjs';
import {
  selectHealthTips,
  selectLoading,
} from 'src/state/selectors/health-tips.selectors';

import mockHealthTipsList from '../../../test/mocks/health-tip-list.mock.json';
import mockMultipleDatesHealthTipsList from '../../../test/mocks/today-thisWeek-earlier-healthTips.mock.json';

describe('HealthTipsListContainerComponent', () => {
  let component: HealthTipsListContainerComponent;
  let fixture: ComponentFixture<HealthTipsListContainerComponent>;
  let mockStore: any;

  beforeEach(() => {
    mockStore = {
      select: jasmine.createSpy('select').and.callFake((selector: any) => {
        if (selector === selectLoading) {
          return of(false);
        } else if (selector === selectHealthTips) {
          return of(mockHealthTipsList);
        } else {
          return of({});
        }
      }),
      dispatch: jasmine.createSpy('dispatch'),
    };

    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [HealthTipsListContainerComponent],
      providers: [{ provide: Store, useValue: mockStore }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthTipsListContainerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch the loadHealthTips action and set loading on ngOnInit', () => {
    component.ngOnInit();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      loadHealthTipsActions.loadHealthTips()
    );
    expect(component.loading$).toBeDefined();
  });

  it('should set the healthTips, todayTips, thisWeekTips, and earlierTips arrays on subscription to selectHealthTips', () => {
    component.setHealthTips();
    expect(mockStore.select).toHaveBeenCalledWith(selectHealthTips);
    expect(component.healthTips).toEqual(mockHealthTipsList);
    expect(component.todayTips).toBeDefined();
    expect(component.thisWeekTips).toBeDefined();
    expect(component.earlierTips).toBeDefined();
  });

  it('should return the health tips for today', () => {
    const mockHealthTips: IHealthTip[] = mockMultipleDatesHealthTipsList;

    const expectedTodayTips = [
      {
        type: 'FamilyHealthTip',
        id: 2000,
        title:
          'FamiliyTip - Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been',
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text eve",
        upVotes: 0,
        downVotes: 0,
        datetime: '2023-05-30T10:04:29.397750Z',
      },
    ];
    component.healthTips = mockHealthTips;
    const result = component.getTodayTips(mockHealthTips);
    expect(result).toEqual(expectedTodayTips);
  });

  it('should return the health tips for this week (excluding today)', () => {
    const mockHealthTips: IHealthTip[] = mockMultipleDatesHealthTipsList;
    const expectedThisWeekTips = [
      {
        type: 'FitnessHealthTip',
        id: 3009,
        title:
          'FitnessTip - Lorem Ipsum is simply dummy text of the printing and typ',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum',
        upVotes: 0,
        downVotes: 0,
        datetime: '2023-05-29T10:23:29.399026Z',
      },
    ];
    const result = component.getThisWeekTips(mockHealthTips);
    expect(result).toEqual(expectedThisWeekTips);
  });

  it('should return the health tips before the start of the current week', () => {
    const mockHealthTips: IHealthTip[] = mockMultipleDatesHealthTipsList;
    const expectedEarlierTips = [
      {
        type: 'FamilyHealthTip',
        id: 2013,
        title:
          'FamiliyTip - Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indu',
        upVotes: 0,
        downVotes: 0,
        datetime: '2023-05-26T10:23:29.399131Z',
      },
    ];
    component.healthTips = mockHealthTips;
    const result = component.getEarlierTips(mockHealthTips);
    expect(result).toEqual(expectedEarlierTips);
  });
});
