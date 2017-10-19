import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddFormComponent } from './addForm.component';

@NgModule({
  declarations: [
    AddFormComponent
  ],
  imports: [
    NgbModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AddFormComponent]
})
export class AddFormModule { }
