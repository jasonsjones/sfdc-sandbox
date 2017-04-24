import { Component, OnInit } from '@angular/core';

import { AuthService } from '../core/auth.service';
import { IUser } from '../user/user';

@Component({
    selector: 'user-popover',
    templateUrl: 'src/app/header/user-popover.component.html'
})
export class UserPopOverComponent implements OnInit { 
    currentUser: IUser = null;

    constructor(private auth: AuthService) { }

    ngOnInit(): void {
        this.currentUser = this.auth.currentUser;
    }

    logout(): void {
        this.auth.logout();
    }


}