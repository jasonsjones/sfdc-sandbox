import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService { 
    public token: string;

    constructor(private http: Http) {}

    isAuthenticated(): boolean {
        return !!this.token;
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post('http://localhost:3000/api/login', {username: username, password: password})
            .map((response: Response) => {
                let token = response.json() && response.json().payload.token;
                if (token) {
                    this.token = token;

                    // store username and jwt in local storage to keep user
                    // logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({
                        username: username,
                        userId: response.json().payload.user._id,
                        token: token
                    }));
                }
                return response.json().success;
            });
    }
}