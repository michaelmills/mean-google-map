import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QueryFormComponent } from './queryForm.component';
import { AddFormComponent } from './addForm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    NgbModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    QueryFormComponent,
    AddFormComponent
  ],
  providers: [],
  bootstrap: [
    QueryFormComponent,
    AddFormComponent
  ]
})
export class FormModule { }
