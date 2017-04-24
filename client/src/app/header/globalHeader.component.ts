import { Component } from '@angular/core';

import { AuthService } from '../core/auth.service';

@Component({
    selector: 'global-header',
    templateUrl: 'src/app/header/globalHeader.component.html'
})
export class GlobalHeaderComponent { 
    hideUserPopover: boolean = true;

    constructor(private auth: AuthService) { }

    toggleUserPopover(): void {
        this.hideUserPopover = !this.hideUserPopover;
    }
}
