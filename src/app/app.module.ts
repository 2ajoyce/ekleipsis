import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';

import { MdListModule, MdCardModule, MdInputModule } from '@angular/material';

export const firebaseConfig = {
  apiKey: 'AIzaSyCmYrV_pC4mMCjWqgzLzF-5iT4sw9M0B_U',
  authDomain: 'hello-world-67b7c.firebaseapp.com',
  databaseURL: 'https://hello-world-67b7c.firebaseio.com',
  projectId: 'hello-world-67b7c',
  storageBucket: 'hello-world-67b7c.appspot.com',
  messagingSenderId: '114366333871'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    MdListModule,
    MdCardModule,
    MdInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

