import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from 'angularfire2';
import { AppComponent }   from './app.component';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    CommonModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyAGKuuOv3PhzGNxrSskZ9RWxunXGjFn4FQ',
      authDomain: 'fir-poc-fe6af.firebaseapp.com',
      databaseURL: 'https://fir-poc-fe6af.firebaseio.com/'
    }),
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/