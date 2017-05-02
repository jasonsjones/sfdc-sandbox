import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { IUser } from '../user/user';

@Injectable()
export class AuthService { 
    public token: string;
    public currentUser: IUser;

    constructor(private http: Http, private router: Router) {}

    isAuthenticated(): boolean {
        return !!this.token;
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post('http://localhost:3000/api/login', {username: username, password: password})
            .map((response: Response) => {
                let success = response.json() && response.json().success;
                if (success) {
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
                        this.router.navigate(['/one']);
                    }
                }
                return success;
            });
    }

    logout(): void {
        // clear token and remove user from local storage to log out user
        this.token = null;
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }

    private generateCurrentUser(user): IUser {
        return {
            firstname: user.firstName,
            lastname: user.lastName,
            displayName: user.displayName,
            avatar: user.avatar,
            email: user.email,
            username: user.username,
            admin: user.admin
        }

    }
}