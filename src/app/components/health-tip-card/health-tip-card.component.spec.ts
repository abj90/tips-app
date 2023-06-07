import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, RouterLink, ActivatedRoute } from '@angular/router';

import { HealthTipCardComponent } from './health-tip-card.component';

import mockHealthTip from '../../../test/mocks/health-tip.mock.json';
import { IHealthTip } from 'src/common/interfaces';
import { of } from 'rxjs';

describe('HealthTipCardComponent', () => {
  let component: HealthTipCardComponent;
  let fixture: ComponentFixture<HealthTipCardComponent>;
  let activatedRouteMock: any;
  beforeEach(async () => {
    activatedRouteMock = {
      paramMap: of({ get: (param: string) => String(3001) }),
    };
    await TestBed.configureTestingModule({
      declarations: [HealthTipCardComponent],
      imports: [RouterModule],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthTipCardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the data property correctly on ngOnInit', () => {
    component.item = mockHealthTip as IHealthTip;
    fixture.detectChanges();

    expect(component.data).toBeDefined();
  });

  it('should return the correct card data in getCardData', () => {
    const expectedCardData = {
      ...mockHealthTip,
      cardColor: '#cd3e94',
    };

    const result = component.getCardData(mockHealthTip);
    expect(result).toEqual(expectedCardData);
  });
});
