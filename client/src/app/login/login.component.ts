import { Component } from '@angular/core';

@Component({
    templateUrl: 'src/app/login/login.component.html',
    styleUrls: ['src/app/login/login.component.css']
})
export class LoginComponent { 

    model = {};

    login(): void {
        console.log(this.model);
        this.model = {};
    }
}