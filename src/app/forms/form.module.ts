import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/userService';
import { AddFormComponent } from './addForm.component';
import { QueryFormComponent } from './queryForm.component';
import { HttpLogInterceptor } from '../services/httpLogInterceptor';

@NgModule({
  imports: [
    NgbModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    QueryFormComponent,
    AddFormComponent
  ],
  providers: [
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpLogInterceptor, multi: true}
  ],
  bootstrap: [
    QueryFormComponent,
    AddFormComponent
  ]
})
export class FormModule { }
