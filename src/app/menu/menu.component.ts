import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  categoryList:any[];
  currentItem:any;
  @ViewChild('addOn') addOn;

  constructor(private menuService:MenuService) { }

  showModal(item) {
    this.addOn.showModal(item);
  }

  //Create the JSON object for menu
  ngOnInit() {
    this.menuService.getMenu().subscribe(data => {
      var i = 0;
      this.categoryList = [];
      for(var category of data){ 
        var categoryData = category.Category;       
        this.categoryList[i] = {};
        this.categoryList[i].desc = categoryData.Desc;
        this.categoryList[i].ID = categoryData.ID;
        this.categoryList[i].items = [];
        var j = 0;
        for(var item of categoryData.Items){
          var itemData = item.Item;
          this.categoryList[i].items[j] = {};
          this.categoryList[i].items[j].ID = itemData.ID;
          this.categoryList[i].items[j].Price = itemData.Price;
          this.categoryList[i].items[j].PromptForDesc = itemData.PromptForDesc;
          this.categoryList[i].items[j].desc = itemData.desc;
          this.categoryList[i].items[j].img = itemData.img;
          this.categoryList[i].items[j].modifiers = [];
          var k = 0;
          for(var modifier of itemData.Modifiers.Preps){
            this.categoryList[i].items[j].modifiers[k] = {};
            this.categoryList[i].items[j].modifiers[k].groupName = itemData.Modifiers.groupName;
            this.categoryList[i].items[j].modifiers[k].ID = modifier.ID;
            this.categoryList[i].items[j].modifiers[k].Desc = modifier.Desc;
            this.categoryList[i].items[j].modifiers[k].Price = modifier.Price;
            this.categoryList[i].items[j].modifiers[k].PromptForDesc = modifier.PromptForDesc;
            this.categoryList[i].items[j].modifiers[k].quantity = modifier.Quantity;
            k++;
          }
          j++;
        }
        i++;
      }   
      console.log(this.categoryList);
    });    
  }
}