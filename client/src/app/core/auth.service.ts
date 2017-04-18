import { Injectable } from '@angular/core';

@Injectable()
export class AuthService { 
    currentUser: any = null;

    isAuthenticated(): boolean {
        return !!this.currentUser;
    }
}