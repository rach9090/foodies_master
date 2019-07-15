import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart:any;

  constructor(private cartService:CartService) { }

  ngOnInit() {
    this.cart = JSON.parse(this.cartService.getCartData());
    this.calculateTax();
  }

  //Decrement quantity
  decrement(cart) {
    cart.quantity = cart.quantity * 1;
    if(cart.quantity > 1){
      cart.quantity = cart.quantity - 1;
      cart.totalPrice = cart.totalPrice - cart.unitPrice;
      this.cart.totalCartAmount = this.cart.totalCartAmount - cart.unitPrice;
      this.calculateTax();
      localStorage.setItem("productList",JSON.stringify(this.cart));
    }    
  }

  //Increment quantity
  increment(cart) {
    cart.quantity = cart.quantity * 1;
    cart.quantity = cart.quantity + 1;
    cart.totalPrice = cart.totalPrice + cart.unitPrice;
    this.cart.totalCartAmount = this.cart.totalCartAmount + cart.unitPrice;
    this.calculateTax();
    localStorage.setItem("productList",JSON.stringify(this.cart));
  }

  //Change quantity
  quantityChange(cart) {
    cart.quantity = cart.quantity * 1;
    var newTotal = cart.quantity * cart.unitPrice;    
    this.cart.totalCartAmount = this.cart.totalCartAmount - cart.totalPrice + newTotal;
    cart.totalPrice = newTotal;
    this.calculateTax();
    localStorage.setItem("productList",JSON.stringify(this.cart));
  }

  //Delete product
  deleteCartProduct(cart){
    var index = this.cart.items.findIndex(x => x.cartID === cart.cartID);
    if(index !== undefined){
      this.cart.items.splice(index,1);
      this.cart.count = this.cart.count - 1;
      this.cart.totalCartAmount = this.cart.totalCartAmount - cart.totalPrice;
      this.calculateTax();
    }
    localStorage.setItem("productList",JSON.stringify(this.cart));    
    this.cartService.cartItemChange(this.cart.count);
  }

  //Calculate Tax
  calculateTax(){
    this.cart.tax = this.cart.totalCartAmount * 0.08;
    this.cart.grossAmount = this.cart.totalCartAmount + this.cart.tax + 5.49 + 0.71;
  }
}