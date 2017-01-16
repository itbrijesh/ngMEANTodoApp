import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Http, HttpModule } from '@angular/http';
import { TodosService } from './components/services/todos.service';

import { AppComponent }  from     './app.component';
import { TodosComponent } from    './components/todos.component'
import * as _ from 'underscore';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, 
                   ], 
  declarations: [ AppComponent, 
                  TodosComponent ],
  providers:    [ TodosService ],
  exports : [  ],
  schemas: [ ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }