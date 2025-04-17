import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class HttpClientUtils{
    // urlApi: string = 'http://localhost:9100/v1/';
    urlApi: string = 'https://api.gocreos.com/v1/';

    constructor(private httpClient: HttpClient, private router: Router){}

    getQuery(query: string){
        const url = `${this.urlApi + query}`;
        return this.httpClient.get(url);
    }

    postQuery(query: string, params: any){
        const url = `${this.urlApi + query}`;
        return this.httpClient.post(url, params);
    }
}