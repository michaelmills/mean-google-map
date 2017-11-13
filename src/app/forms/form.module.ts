import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/userService';
import { AddFormComponent } from './addForm.component';
import { QueryFormComponent } from './queryForm.component';

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
  providers: [ UserService ],
  bootstrap: [
    QueryFormComponent,
    AddFormComponent
  ]
})
export class FormModule { }
