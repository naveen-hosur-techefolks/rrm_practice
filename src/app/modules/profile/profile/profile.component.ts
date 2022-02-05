import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Customer } from 'src/app/core/models/customer';
import { CommonService } from 'src/app/core/services/common/common.service';
import { NotificationService } from 'src/app/core/services/notify.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  public profileForm: FormGroup;
  public customer: Customer;
  constructor(private commonService: CommonService, private notificationService: NotificationService) {
    this.profileForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phoneNumber: new FormControl(''),
    });
    this.customer = {};
    this.commonService.getCustomer().subscribe((res: any) => {
      this.customer = res as Customer;
      this.profileForm.setValue({
        firstName: res['firstName'],
        lastName: res['lastName'],
        email: res['email'],
        phoneNumber: res['phoneNumber'],

      });
    })
  }

  onSubmit() {
    this.customer.firstName = this.profileForm.value.firstName;
    this.customer.lastName = this.profileForm.value.lastName;
    this.customer.phoneNumber = this.profileForm.value.phoneNumber;
    this.customer.email = this.profileForm.value.email;
    this.commonService.updateCustomer(this.customer).subscribe((res) => {
      this.notificationService.showSuccess('Updated Profile Successfully')
    });
  }


}
