import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, delay, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IHealthTip, IHealthTipParams } from 'src/common/interfaces';
import { voteType } from 'src/common/enums';

@Injectable({
  providedIn: 'root',
})
export class HealthTipsService {
  constructor(private http: HttpClient) {}

  getTips(param: IHealthTipParams): Observable<IHealthTip[]> {
    const params = this.getParams(param);
    return this.http
      .get<IHealthTip[]>(`${environment.baseUrl}/posts`, { params })
      .pipe(delay(1000));
  }

  getParams(param: IHealthTipParams): HttpParams {
    let params = new HttpParams();
    for (const key in param) {
      let keyValue = param[key as keyof IHealthTipParams];
      if (keyValue !== '') {
        params = params.set(key.toString(), keyValue);
      }
    }

    return params;
  }

  getTipById(tipId: number): Observable<IHealthTip> {
    return this.http.get<IHealthTip>(`api/tips/${tipId}`).pipe(delay(1000));
  }

  voteHealthTip(tipId: number, vote: voteType): Observable<IHealthTip> {
    return this.http
      .put<IHealthTip>(`api/tips/${tipId}/vote/${vote}`, {})
      .pipe(delay(1000));
  }

  removeTip(tipId: number): Observable<any> {
    return this.http
      .delete<any>(`${environment.baseUrl}/posts/${tipId}`)
      .pipe(delay(1000));
  }

  createTip(newTip: IHealthTip): Observable<any> {
    const body = newTip;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return this.http.post<any>(`${environment.baseUrl}/posts`, body, {
      headers,
    });
  }
}
