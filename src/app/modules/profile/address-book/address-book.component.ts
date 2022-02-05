import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Address } from 'src/app/core/models/address';
import { CommonService } from 'src/app/core/services/common/common.service';
import { NotificationService } from 'src/app/core/services/notify.service';
import { AddressDetailsComponent } from '../address-details/address-details.component';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit {
  addressList: any[] = [];
  constructor(
    private readonly commonService: CommonService,
    private notificationService: NotificationService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getAddress();
  }
  getAddress(){
    this.commonService.getAddress().subscribe((res) => {
      this.addressList = res;
    });
  }
  deleteAddress(address: Address) {
    this.commonService.deleteAddress(address?.id).subscribe((res) => {
      this.notificationService.showSuccess('Deleted Address Successfully');
      this.commonService.getAddress().subscribe((res) => {
        this.addressList = res;
      })
    })
  }
  editAddress(address:Address){
    const modalRef = this.modalService.open(AddressDetailsComponent, {
      size: 'xl',
      centered: true,
      windowClass: 'dark-modal'
    });
    modalRef.componentInstance.data = address;
    modalRef.result.then((res) => {
      this.getAddress();
    }, (reason) => {
      this.getAddress();
    })
  }
}
