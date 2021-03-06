import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TbselectComponent } from './tbselect/tbselect.component';
import { TbcompetitiveComponent } from './tbcompetitive/tbcompetitive.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'teambuilder-select', component: TbselectComponent },
  { path: 'teambuilder-competitive', component: TbcompetitiveComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
