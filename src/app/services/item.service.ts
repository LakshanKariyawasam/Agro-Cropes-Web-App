import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemMaster } from '../models/item-master';
import { ResponseWrapper } from '../models/response-wrapper';
import { AppParams } from '../app.module';
import { AddNewItem } from '../models/add-new-item';

@Injectable()
export class ItemService {

  constructor(public http: HttpClient) { }


  public getItemList() {
    return this.http.get<ResponseWrapper<ItemMaster>>(AppParams.BASE_PATH + "item/getItem");
  }

  public addNewItem(payload) {
    return this.http.post(AppParams.BASE_PATH + "itemMaintenance/addItemMaster", payload);
  }

  public getAllItem() {
    return this.http.get<ResponseWrapper<AddNewItem>>(AppParams.BASE_PATH + "itemMaintenance/getItemMaster");
  }

  public editItem(payload) {
    return this.http.put(AppParams.BASE_PATH + "itemMaintenance/editItemMaster", payload);
  }
}
