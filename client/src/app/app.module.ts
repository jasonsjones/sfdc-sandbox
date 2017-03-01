import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GlobalHeaderComponent } from './header/globalHeader.component';

@NgModule({
    imports: [ BrowserModule ],
    declarations: [ AppComponent, GlobalHeaderComponent ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }