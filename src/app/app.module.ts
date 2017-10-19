import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AddFormComponent } from './forms/addForm.component';
import { QueryFormComponent } from './forms/queryForm.component';

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
    AppComponent,
    AddFormComponent,
    QueryFormComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
