import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AddFormComponent } from './forms/addForm.component';
import { QueryFormComponent } from './forms/queryForm.component';
import { GoogleMapService } from './services/googleMapService';
import { FormModule } from './forms/form.module';

const appRoutes: Routes = [
  {
    path: 'join',
    component: AddFormComponent
  },
  {
    path: 'find',
    component: QueryFormComponent
  },
  {
    path: '',
    redirectTo: '/join',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    FormsModule,
    FormModule
  ],
  bootstrap: [ AppComponent ],
  providers: [ GoogleMapService ]
})
export class AppModule { }
