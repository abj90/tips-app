import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HealthTipsService } from './health-tips.service';
import { environment } from 'src/environments/environment';
import health_tips_list from '../test/mocks/health-tip-list.mock.json';
import heakth_tip from '../test/mocks/health-tip.mock.json';

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

  it('should get tips with parameters', () => {
    const mockParams = { q: '', _sort: 'datetime', _order: 'asc' };

    service.getTips(mockParams).subscribe((tips) => {
      expect(tips).toEqual(health_tips_list);
    });

    const req = httpMock.expectOne(
      `${environment.baseUrl}/posts?_sort=datetime&_order=asc`
    );
    expect(req.request.method).toBe('GET');
    req.flush(health_tips_list);
  });

  it('should get tip by id', () => {
    const tipId = 2;
    service.getTipById(tipId).subscribe((tip) => {
      expect(tip).toEqual(heakth_tip);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/posts/${tipId}`);
    expect(req.request.method).toBe('GET');
    req.flush(heakth_tip);
  });

  it('should remove tip by id', () => {
    const tipId = 2;

    service.removeTip(tipId).subscribe();

    const req = httpMock.expectOne(`${environment.baseUrl}/posts/${tipId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should create a new tip', () => {
    const newTip = {
      title:
        "PsychoTip: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
      text: 'Lorem Ipsum is simply dummy text of the printing and ty updated again',
      datetime: '2023-05-29T11:12:13.668077Z',
    };
    const mockResponse = { id: 12, ...newTip };

    service.createTip(newTip).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/posts`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTip);
    req.flush(mockResponse);
  });

  it('should update an existing tip', () => {
    const tipId = 12;
    const updatedTip = {
      title: 'updated Tip',
      text: 'Lorem Ipsum updated',
      datetime: '2023-05-29T11:12:13.668077Z',
    };

    service.updateTip(updatedTip, tipId).subscribe((response) => {
      expect(response).toEqual(updatedTip);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/posts/${tipId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedTip);
    req.flush(updatedTip);
  });
});
