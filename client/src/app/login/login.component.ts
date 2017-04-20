import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
    templateUrl: 'src/app/login/login.component.html',
    styleUrls: ['src/app/login/login.component.css']
})
export class LoginComponent { 

    model:any = {};

    constructor(private authService: AuthService) {}

    login(): void {
        this.authService.login(this.model.username, this.model.password)
            .subscribe(data => {
            });
        this.model = {}
    }
}