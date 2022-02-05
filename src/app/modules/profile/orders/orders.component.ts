import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { orders } from 'src/app/core/models/order';
import { CommonService } from 'src/app/core/services/common/common.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders:orders[]=[];

  constructor(
    private readonly commonService:CommonService,
    private readonly router:Router
    ) { }

  ngOnInit(): void {
    this.commonService.getOrders().subscribe((res)=>{
      this.orders =res;
    })
  }
}
