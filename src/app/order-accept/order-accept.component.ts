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

  orderList: any[];

  constructor(private router: Router, private ordersrvice: OrderService) { }

  ngOnInit() {
    this.getOrderList();
  }

  getOrderList() {
    this.loadingMask = true;
    this.ordersrvice.getOrderList()
      .snapshotChanges().subscribe(books => {
        books.forEach(item => {
          let a = item.payload.toJSON();
          a['$key'] = item.key;
          console.log("a ::: ", a);
          // this.orderList.push(a as Book)
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
