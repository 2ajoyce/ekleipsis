import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './providers/auth.service';
import { AppComponent } from './app.component';

import { MdListModule, MdCardModule, MdInputModule } from '@angular/material';
import { LoginPageComponent } from './login-page/login-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth.guard';

export const firebaseConfig = {
  apiKey: 'AIzaSyCmYrV_pC4mMCjWqgzLzF-5iT4sw9M0B_U',
  authDomain: 'hello-world-67b7c.firebaseapp.com',
  databaseURL: 'https://hello-world-67b7c.firebaseio.com',
  projectId: 'hello-world-67b7c',
  storageBucket: 'hello-world-67b7c.appspot.com',
  messagingSenderId: '114366333871'
};

const appRoutes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: '**', component: LoginPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MdListModule,
    MdCardModule,
    MdInputModule
  ],
  providers: [ AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

