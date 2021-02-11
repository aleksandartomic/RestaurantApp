import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.toastr.success('Login in successfully');
      console.log('Login in successfully');
    }, error => {
      this.toastr.error("Incorrect username or password");
      console.log(error);
    }, () => {
      this.router.navigate(['/home']);
    });
  }

}
