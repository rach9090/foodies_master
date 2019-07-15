import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  storeDetails:any;

  //Get store information
  constructor(private restaurantService:RestaurantService) { 
    this.restaurantService.getStoreData().subscribe(data => {
      this.storeDetails = data.Stores[0]; 
    });
  }

  ngOnInit() {
  }

}
