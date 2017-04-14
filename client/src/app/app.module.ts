import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { GlobalHeaderComponent } from './header/globalHeader.component';
import { GlobalNavComponent } from './navbar/globalNav.component';
import { OneAppMainComponent } from './one/oneapp-main.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
    { path: 'one', component: OneAppMainComponent },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
@NgModule({
    imports: [ BrowserModule, RouterModule.forRoot(appRoutes) ],
    declarations: [ 
        AppComponent,
        GlobalHeaderComponent,
        GlobalNavComponent,
        OneAppMainComponent,
        LoginComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }