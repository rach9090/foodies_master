import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartCount:Number = 0;
  url:any = 0;
  
  //Update cart count on cart chane event
  constructor(private cartService: CartService, private router:Router) { 
    this.cartService.cartItem$.subscribe(item => this.cartCount = item);
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd){
        this.url = val.url;
      }
    });
  };

  //Get the initial cart count
  ngOnInit() {
    var cartData = this.cartService.getCartData();
    if(cartData){
      this.cartCount = JSON.parse(this.cartService.getCartData()).count;
    }else{
      this.cartCount = 0;
    }    
  }
}