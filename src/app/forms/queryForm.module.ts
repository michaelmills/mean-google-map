import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QueryFormComponent } from './queryForm.component';

@NgModule({
  declarations: [
    QueryFormComponent
  ],
  imports: [
    NgbModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [QueryFormComponent]
})
export class QueryFormModule { }
