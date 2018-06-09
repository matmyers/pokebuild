import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TbselectComponent } from './tbselect/tbselect.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarpbComponent } from './navbarpb/navbarpb.component';

@NgModule({
  declarations: [
    AppComponent,
    TbselectComponent,
    HomeComponent,
    NavbarpbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
