import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private categoriesDataUrl = '../assets/data/categories.json';
  
    constructor(private http:HttpClient) {
    }
  
    //Get menu details
    public getMenu():Observable<any> {
      return this.http.get(this.categoriesDataUrl);
    }
}
