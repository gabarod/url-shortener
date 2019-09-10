import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UrlShortenerService {

  apiUrl = 'http://localhost:7000';

  shortBaseUrl = "http://localhost:7000";

  constructor(private _http: HttpClient) { }

  postUrlToShort(url: string, lat: string, lng: string) {
    const model = {
      "originalUrl": url,
      "shortBaseUrl": this.shortBaseUrl,
      "lat": lat,
      "lng": lng
    };
    console.dir(model);
    const endPoint = '/api/item';
    return this._http.post<any>(this.apiUrl + endPoint, model)
      .pipe(map(res => res));
  }

  getUrlFromShort(code: string) {
    const endPoint = '/' + code;
    return this._http.get<any>(this.apiUrl + endPoint)
      .pipe(map(res => res));
  }

  getAllUrls() {
    const endPoint = '/api/getAll';
    return this._http.get<any>(this.apiUrl + endPoint)
      .pipe(map(res => res));
  }
}
