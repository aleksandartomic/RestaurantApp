import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/_models/user';
import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://localhost:44347/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser!: User;

constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            localStorage.setItem('user', JSON.stringify(user.user));
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            this.currentUser = user.user;
          }
        })
      );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token!);
  }

}
