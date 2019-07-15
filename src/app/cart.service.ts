import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cartItemSource = new BehaviorSubject<number>(0);
  cartItem$ = this._cartItemSource.asObservable();
  
  constructor(private http:HttpClient) {
  }

  //Get cart list
  public getCartData():string {
    return localStorage.getItem("productList");
  }

  //Detect cart change
  public cartItemChange(count){
    this._cartItemSource.next(count);
  }

}