import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class PeopleService {
    private baseUrl: string = 'http://localhost/api';

    constructor(private http: Http) {}

    getPeople(): Observable<any> {
        return this.http.get(`${this.baseUrl}/users`)
            .map((response: Response) => {
                return response.json();
            });
    }

    getUser(id: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/user/${id}`)
            .map((response: Response) => {
                return response.json();
            });
    }
}