import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AuthService } from './core/auth.service';
import { GlobalHeaderComponent } from './header/globalHeader.component';
import { UserPopOverComponent } from './header/user-popover.component';
import { GlobalNavComponent } from './navbar/globalNav.component';
import { OneAppMainComponent } from './one/oneapp-main.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
    { path: 'one', component: OneAppMainComponent },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
@NgModule({
    imports: [ BrowserModule,
               ReactiveFormsModule,
               HttpModule,
               RouterModule.forRoot(appRoutes)
    ],
    declarations: [ 
        AppComponent,
        GlobalHeaderComponent,
        GlobalNavComponent,
        UserPopOverComponent,
        OneAppMainComponent,
        LoginComponent
    ],
    providers: [ AuthService ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }