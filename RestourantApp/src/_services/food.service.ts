import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food } from 'src/_models/food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  baseUrl = 'https://localhost:44347/api/menu/';

constructor(private http: HttpClient) { }

  getFood(category: string): Observable<Food[]> {
    return this.http.get<Food[]>(this.baseUrl + category);
  }

}
