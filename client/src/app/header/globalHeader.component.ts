import { Component, OnInit } from '@angular/core';

import { AuthService } from '../core/auth.service';
import { IUser } from '../user/user';

@Component({
    selector: 'global-header',
    templateUrl: 'src/app/header/globalHeader.component.html'
})
export class GlobalHeaderComponent implements OnInit { 
    hideUserPopover: boolean = true;
    currentUser: IUser;

    constructor(private auth: AuthService) { }

    ngOnInit(): void {
        this.currentUser = this.auth.currentUser;
    }

    toggleUserPopover(): void {
        this.hideUserPopover = !this.hideUserPopover;
    }
}
