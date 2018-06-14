import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TbselectComponent } from './tbselect/tbselect.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarpbComponent } from './navbarpb/navbarpb.component';
import { TbcompetitiveComponent } from './tbcompetitive/tbcompetitive.component';
import { PkmncubbyComponent } from './pkmncubby/pkmncubby.component';
import { TeamComponent } from './team/team.component';

@NgModule({
  declarations: [
    AppComponent,
    TbselectComponent,
    HomeComponent,
    NavbarpbComponent,
    TbcompetitiveComponent,
    PkmncubbyComponent,
    TeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
