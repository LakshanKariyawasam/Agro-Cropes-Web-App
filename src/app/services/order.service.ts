import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Router } from '@angular/router';

@Injectable()
export class OrderService {

    ordersRef: AngularFireList<any>;
    orderRef: AngularFireObject<any>;

    constructor(private afd: AngularFireDatabase, private router: Router) {
    }


    getOrderList() {
        var userId = "krasikalakshan@gmail.com";
        this.ordersRef = this.afd.list('orders/' + userId);
        return this.ordersRef;
    }

}
