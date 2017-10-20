import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QueryFormComponent } from './queryForm.component';
import { AddFormComponent } from './addForm.component';

@NgModule({
  declarations: [
    QueryFormComponent,
    AddFormComponent
  ],
  imports: [
    NgbModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [
    QueryFormComponent,
    AddFormComponent
  ]
})
export class FormModule { }
