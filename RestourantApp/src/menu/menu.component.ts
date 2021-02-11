import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from 'src/_models/food';
import { FoodService } from 'src/_services/food.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  title!: string;
  foods!: Food[];

  constructor(private router: Router, private route: ActivatedRoute, private foodService: FoodService) { 
    const title: string = this.route.snapshot.params.title;
    this.title = title;
  }

  ngOnInit() {
    this.loadFood();
  }

  loadFood() {
    this.title;
    this.foodService.getFood(this.title).subscribe(res => {
      this.foods = res;
      console.log(this.foods);
    });
  }

}
