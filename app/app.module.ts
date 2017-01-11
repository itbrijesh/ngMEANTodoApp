import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Http, HttpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppComponent }  from     './app.component';
import { HomeComponent } from     './components/home.component';
import { ProfileComponent } from  './components/profile.component';
import { routing } from           './app.routing';
import { Auth } from './services/auth.service';
import { AuthGuard } from './services/authguard.service';

import * as _ from 'underscore';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, 
                  routing ], 
  declarations: [ AppComponent, 
                  HomeComponent, ProfileComponent ],
  providers:    [ AUTH_PROVIDERS, Auth, AuthGuard ],
  exports : [  ],
  schemas: [ ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }