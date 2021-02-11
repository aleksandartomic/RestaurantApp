import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Burger';
  titleOne = 'Pasta';
  titleTwo = 'Drink';

  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
  }

  navMenu(tit: string) {
    this.router.navigateByUrl(`/menu/${tit}`);
    console.log(tit);
  }

}
