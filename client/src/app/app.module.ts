import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AuthService } from './core/auth.service';
import { AuthGuard } from './core/auth.guard';
import { GlobalHeaderComponent } from './header/globalHeader.component';
import { UserPopOverComponent } from './header/user-popover.component';
import { GlobalNavComponent } from './navbar/globalNav.component';
import { OneAppMainComponent } from './one/oneapp-main.component';
import { HomeComponent } from './one/home.component';
import { PeopleComponent } from './user/people.component';
import { PeopleService } from './user/people.service';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
    {
        path: 'one',
        component: OneAppMainComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full'},
            { path: 'home', component: HomeComponent },
            { path: 'people', component: PeopleComponent }
        ]
    },
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
        HomeComponent,
        PeopleComponent,
        LoginComponent
    ],
    providers: [ AuthService, AuthGuard, PeopleService ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }