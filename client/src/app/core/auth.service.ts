import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { IUser } from '../user/user';

@Injectable()
export class AuthService { 
    public token: string;
    public currentUser: IUser;

    constructor(private http: Http) {}

    isAuthenticated(): boolean {
        return !!this.token;
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post('http://localhost:3000/api/login', {username: username, password: password})
            .map((response: Response) => {
                let token = response.json() && response.json().payload.token;
                let user = response.json() && response.json().payload.user;
                if (token) {
                    this.token = token;
                    this.currentUser = this.generateCurrentUser(user);

                    // store user info and jwt in local storage to keep user
                    // logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({
                        username: username,
                        userId: user._id,
                        token: token
                    }));
                }
                return response.json().success;
            });
    }

    logout(): void {
        // clear token and remove user from local storage to log out user
        this.token = null;
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }

    private generateCurrentUser(user): IUser {
        return {
            firstname: user.name.first,
            lastname: user.name.last,
            email: user.email,
            username: user.local.username,
            admin: user.admin
        }

    }
}