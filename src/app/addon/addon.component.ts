import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-addon',
  templateUrl: './addon.component.html',
  styleUrls: ['./addon.component.scss']
})
export class AddonComponent implements OnInit {
  currentItem:any;
  selectedItem:any={};
  cart:any;

  constructor(private router:Router, private cartService:CartService) {
  }
  
  ngOnInit() {
  }

  //Show add ons
  showModal(item):void {
    this.currentItem = item;
    this.currentItem.quantity = 1;
    for(var modifier of this.currentItem.modifiers){
      modifier.Price = modifier.Price.replace(/[^0-9.-]+/g,"");
    }
    console.log(item); 
  }

  //Decrement quantity
  decrement(modifier) {
    if(modifier.quantity >= 0){
      modifier.quantity = modifier.quantity - 1;
    }    
  }

  //Increment quantity
  increment(modifier) {
    modifier.quantity = modifier.quantity + 1;
  }

  //Create JSON object and add to cart
  addtoCartModal(): void {
    this.hideModal();
    this.cart = JSON.parse(localStorage.getItem("productList"));
    var combineProduct = false;
    this.currentItem.quantity = this.currentItem.quantity * 1;
    if(!this.cart){
      this.cart={};
      this.cart.items = [];
      this.cart.count = 0;
      this.cart.totalCartAmount = 0;
    }else{
      var index = this.cart.items.findIndex(x => x.ID === this.currentItem.ID);
      var checkAddOn = this.currentItem.modifiers.findIndex(x => x.quantity === true);
      if((index >= 0) && (this.cart.items[index].modifier.length === 0) && (checkAddOn < 0)){
        this.cart.items[index].quantity = this.cart.items[index].quantity + this.currentItem.quantity;
        this.cart.items[index].totalPrice = this.cart.items[index].totalPrice + (this.cart.items[index].unitPrice * this.currentItem.quantity);
        this.cart.totalCartAmount = this.cart.totalCartAmount + (this.cart.items[index].unitPrice * this.currentItem.quantity);
        combineProduct = true;
      }
    }
    if(!combineProduct){
      this.selectedItem.Desc = this.currentItem.desc;
      this.selectedItem.Price = this.currentItem.Price.replace(/[^0-9.-]+/g,"");
      this.selectedItem.img = this.currentItem.img;
      this.selectedItem.ID = this.currentItem.ID;
      this.selectedItem.cartID = this.selectedItem.ID + Math.random();
      this.selectedItem.quantity = this.currentItem.quantity;
      var total = this.selectedItem.Price;
      var i = 0;
      this.selectedItem.modifier=[];
      for(var modifier of this.currentItem.modifiers){
        if(modifier.quantity > 0){
          this.selectedItem.modifier[i] = {}
          this.selectedItem.modifier[i].ID = modifier.ID;
          this.selectedItem.modifier[i].Desc = modifier.Desc;
          this.selectedItem.modifier[i].Price = modifier.Price;
          this.selectedItem.modifier[i].quantity = modifier.quantity;
          if(this.selectedItem.modifier[i].quantity){
            total = (total * 1) + (modifier.Price * 1);
          }        
          i++;
        }
      }
      this.selectedItem.unitPrice = total *   1;
      this.selectedItem.totalPrice = total * this.selectedItem.quantity;    
      this.cart.items.push(this.selectedItem);
      this.cart.count = this.cart.items.length;
      this.cart.totalCartAmount = this.cart.totalCartAmount + this.selectedItem.totalPrice;     
      this.cartService.cartItemChange(this.cart.count);
    }
    localStorage.setItem('productList', JSON.stringify(this.cart));
  }

  //Close modal
  hideModal():void {
    document.getElementById('close-modal').click();
  }
}