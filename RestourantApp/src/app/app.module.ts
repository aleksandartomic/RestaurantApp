import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from "@auth0/angular-jwt";

import { AppComponent } from './app.component';
import { LoginComponent } from 'src/login/login.component';
import { RegisterComponent } from 'src/register/register.component';
import { appRoutes } from 'src/routes';
import { AuthService } from 'src/_services/auth.service';
import { HomeComponent } from 'src/home/home.component';
import { MenuComponent } from 'src/menu/menu.component';
import { NavComponent } from 'src/nav/nav.component';
import { FoodService } from 'src/_services/food.service';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [					
    AppComponent,
      LoginComponent,
      RegisterComponent,
      HomeComponent,
      MenuComponent,
      NavComponent
   ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot(), // ToastrModule added
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:44347'],
        disallowedRoutes: ['localhost:44347/api/auth'],
      },
    })
  ],
  providers: [
    AuthService,
    FoodService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
