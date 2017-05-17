import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../core/auth.service';

@Component({
    templateUrl: 'src/app/login/login.component.html',
    styleUrls: ['src/app/login/login.component.css']
})
export class LoginComponent implements OnInit { 

    loginForm: FormGroup;
    failedLogin: boolean = false;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });

    }

    login(model: any): void {
        this.authService.login(model.username, model.password)
            .subscribe(data => {
                if (data) {
                    this.failedLogin = false;
                    console.log('Login successful...check localStorage');
                    console.log('need to redirect to somewhere else...');
                } else {
                    this.failedLogin = true;
                    this.loginForm.reset();
                    console.log(this.loginForm);
                }
            });
    }
}