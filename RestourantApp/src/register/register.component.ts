import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/_models/user';
import { AuthService } from 'src/_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user!: User;
  registerForm!: FormGroup;
  bsConfig!: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-blue'
    };
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]]
    });
  }



  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(
        () => {
          this.toastr.success('Registration succesful');
        },
        error => {
          console.log(error)
        }, () => {
            this.router.navigate(['/login']);
        }
      );
    }
  }

}
