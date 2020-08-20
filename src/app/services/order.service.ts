import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Router } from '@angular/router';

@Injectable()
export class OrderService {

    ordersRef: AngularFireList<any>;
    orderRef: AngularFireObject<any>;
    vendorRef: AngularFireList<any>;

    constructor(private afd: AngularFireDatabase, private router: Router) {
    }


    getOrderList(date) {
        console.log("date :: ", date);
        this.ordersRef = this.afd.list('orders', ref => ref.orderByChild('dateInserted').equalTo(date));
        return this.ordersRef;
    }

    getVendorName(key) {
        this.vendorRef = this.afd.list('customers', ref => ref.orderByChild('$key').equalTo(key));
        return this.vendorRef;
    }
}
