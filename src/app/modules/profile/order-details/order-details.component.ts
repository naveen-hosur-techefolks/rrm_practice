import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { orders } from 'src/app/core/models/order';
import { CommonService } from 'src/app/core/services/common/common.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
orderId:number=0;
orderProducts:any;
orderHistory:any;
order?:orders;
totalPrice:number=0;
gst:number=0;
  constructor(
    private readonly _activatedroute:ActivatedRoute,
    private readonly commonService:CommonService
  ) { }

  ngOnInit(): void {
    this._activatedroute.paramMap.subscribe(params => {
      console.log(params);
       this.orderId = parseInt(params.get('orderId')??'0');
     this.commonService.getOrderDetails(this.orderId).subscribe((res)=>{
       this.orderProducts=res;
       this.updateTotalPrice(this.orderProducts);
     });
     this.commonService.getOrder(this.orderId).subscribe((res)=>{
       this.order = res;
     })
     this.commonService.getOrderHistories(this.orderId).subscribe((res)=>{
      this.orderHistory=res;
    });
      //  this.product=products.find(p => p.productID==this.id);
   });
  }
  updateTotalPrice(orderProducts: any[]) {
    let totalPrice = 0;
    let gst = 0;
    orderProducts.forEach((op) => {
      const productPrice = op?.product?.price * op.quantity;
      totalPrice += productPrice;
      gst += (productPrice * op?.product?.tax) / 100;
    })
    this.totalPrice = totalPrice;
    this.gst = parseFloat(gst.toFixed(2));
  }
}
