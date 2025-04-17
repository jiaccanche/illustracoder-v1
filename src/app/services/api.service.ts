import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpClientUtils } from '../utils/http-client.utils';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClientUtils: HttpClientUtils){}

  postSendContactForm(data: any) {
    return this.httpClientUtils.postQuery('public/contact-us', data).pipe(
      map(data => {
        return data;
      })
    );
  }
}
