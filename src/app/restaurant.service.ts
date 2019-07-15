import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private storesDataUrl = '../assets/data/stores.json';

  constructor(private http:HttpClient) {
  }

  //Get storeDetails
  public getStoreData():Observable<any> {
    return this.http.get(this.storesDataUrl);
  }
}
