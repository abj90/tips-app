import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { delay } from 'rxjs/operators';
import { HealthTipsService } from './health-tips.service';
import healthTipsListMock from '../test/mocks/health-tip-list.mock.json';
import healthTipMock from '../test/mocks/health-tip.mock.json';
import { IHealthTip } from 'src/common/interfaces';

import { voteType } from 'src/common/enums';

describe('HealthTipsService', () => {
  let service: HealthTipsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HealthTipsService],
    });
    service = TestBed.inject(HealthTipsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTips', () => {
    it('should return an observable of health tips', () => {
      const dummyTips: IHealthTip[] = healthTipsListMock;

      service.getTips().subscribe((tips) => {
        expect(tips.length).toBe(14);
        expect(tips).toEqual(dummyTips);
      });

      const req = httpMock.expectOne('api/tips/random');
      expect(req.request.method).toBe('GET');
      req.flush(dummyTips);
    });
  });

  describe('getTipById', () => {
    it('should return an observable of a specific health tip', () => {
      const dummyTip: IHealthTip = healthTipMock;

      service.getTipById(3001).subscribe((tip) => {
        expect(tip.id).toEqual(3001);
      });

      const req = httpMock.expectOne('api/tips/3001');
      expect(req.request.method).toBe('GET');
      req.flush(dummyTip);
    });
  });

  describe('vote HealthTip UP', () => {
    it('should return an observable of the voted health tip', () => {
      const dummyTip: IHealthTip = healthTipMock;
      const dummyTipVote = voteType.UP;

      service.voteHealthTip(3001, dummyTipVote).subscribe((tip) => {
        expect(tip.upVotes).toEqual(1);
      });

      const req = httpMock.expectOne('api/tips/3001/vote/UP');
      expect(req.request.method).toBe('PUT');
      req.flush(dummyTip);
    });
  });
});
