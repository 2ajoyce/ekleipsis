import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AuthService} from './providers/auth.service';
import {AppComponent} from './app.component';

import {MdCardModule, MdInputModule, MdListModule} from '@angular/material';
import {LoginPageComponent} from './login-page/login-page.component';
import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {ColumnComponent} from './column/column.component';
import {ColumnsComponent} from './columns/columns.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegistrationPageComponent} from './registration-page/registration-page.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyCmYrV_pC4mMCjWqgzLzF-5iT4sw9M0B_U',
  authDomain: 'hello-world-67b7c.firebaseapp.com',
  databaseURL: 'https://hello-world-67b7c.firebaseio.com',
  projectId: 'hello-world-67b7c',
  storageBucket: 'hello-world-67b7c.appspot.com',
  messagingSenderId: '114366333871'
};

// const appRoutes: Routes = [
//   { path: '', component: AppComponent },
//   { path: '**', component: AppComponent}
// ];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    NavbarComponent,
    FooterComponent,
    ColumnComponent,
    ColumnsComponent,
    RegistrationPageComponent
  ],
  imports: [
    BrowserModule,
    // RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MdListModule,
    MdCardModule,
    MdInputModule,
    BrowserAnimationsModule,
  ],
  providers: [ AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

