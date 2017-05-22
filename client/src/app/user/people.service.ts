import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class PeopleService {

    constructor(private http: Http) {}

    getPeople(): Observable<any> {
        return this.http.get('http://localhost:3000/api/users')
            .map((response: Response) => {
                return response.json();
            });
    }
}