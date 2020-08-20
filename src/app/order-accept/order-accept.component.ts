import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-accept',
  templateUrl: './order-accept.component.html',
  styleUrls: ['./order-accept.component.scss'],
  providers: [OrderService]
})
export class OrderAcceptComponent implements OnInit {

  public loadingMask: boolean;

  errorMsg = ''; //validation error handle

  error: { name: string, message: string } = { name: '', message: '' }; //firebase error handle

  orderData: any[];

  public date: string;

  constructor(private router: Router, private ordersrvice: OrderService) { }

  ngOnInit() {
    var today = new Date();
    this.date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    this.getOrderList();
  }

  getOrderList() {
    this.loadingMask = true;
    this.ordersrvice.getOrderList(this.date)
      .snapshotChanges().subscribe(orders => {
        this.loadingMask = false;
        orders.forEach(item => {
          let a = item.payload.toJSON();
          a['$key'] = item.key;
          // this.orderData.push(a as Order)
          console.log("a one ::: ", a);
          // this.ordersrvice.getVendorName(a['userId'])
          //   .snapshotChanges().subscribe(customers => {
          //     // a['name'] = customers.name;
          //     console.log("customers name ::: ",customers );
          //     this.loadingMask = false;
          //   });
          console.log("a two ::: ", a);
          // this.orderData.push(a as Order)
        })
        // /* Data table */
        // this.dataSource = new MatTableDataSource(this.BookData);
        // /* Pagination */
        // setTimeout(() => {
        //   this.dataSource.paginator = this.paginator;
        // }, 0);
      });
  }
}
