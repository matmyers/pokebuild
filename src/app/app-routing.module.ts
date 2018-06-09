import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TbselectComponent } from './tbselect/tbselect.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'teambuilderselect', component: TbselectComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
