import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Address } from 'src/app/core/models/address';
import { CommonService } from 'src/app/core/services/common/common.service';
import { NotificationService } from 'src/app/core/services/notify.service';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss']
})
export class AddressDetailsComponent implements OnInit {
public countries:any[] =[];
public states:any[] =[];
public addressForm:FormGroup;
@Input() data:Address;
buttonLabel ='Add new Address';

  constructor(
    public activeModal: NgbActiveModal,
    private commonService:CommonService,
    private readonly notificationService:NotificationService
    ) {
      this.data ={};
      this.addressForm = new FormGroup({
        name: new FormControl(''),
        address1: new FormControl(''),
        address2: new FormControl(''),
        landmark: new FormControl(''),
        city: new FormControl(''),
        postalCode: new FormControl(''),
        phonenumber: new FormControl(''),
        country: new FormControl(''),
        state: new FormControl('')
      });
     }

  ngOnInit(): void {
    if(this.data.id){
      this.buttonLabel='Update Address';
      this.onCountrySelected(this.data?.country?.toString());
      this.addressForm.setValue({
         name: this.data.name,
          address1: this.data.address1,
          address2: this.data.address2,
          landmark: this.data.landmark,
          city: this.data.city,
          postalCode: this.data.postalCode,
          phonenumber: this.data.phonenumber,
          country: this.data.country,
          state: this.data.state
      });
    }

    this.commonService.getCountries().subscribe((res)=>{
      this.countries = res;
    })

  }
  addAddress(){
    if(!this.data.id){
      this.commonService.addAddress(this.addressForm.value).subscribe((res)=>{
        this.notificationService.showSuccess('Address Added Successfully');
        this.activeModal.dismiss('Save click');
      })
    }else{
    this.data.name=this.addressForm.value.name;
    this.data.address1=this.addressForm.value.address1;
    this.data.address2=this.addressForm.value.address2;
    this.data.landmark=this.addressForm.value.landmark;
    this.data.city=this.addressForm.value.city;
    this.data.postalCode=this.addressForm.value.postalCode;
    this.data.phonenumber=this.addressForm.value.phonenumber;
    this.data.country=this.addressForm.value.country;
    this.data.state=this.addressForm.value.state;

      this.commonService.editAddress(this.data).subscribe((res)=>{
        this.notificationService.showSuccess('Address Edited Successfully');
        this.activeModal.dismiss('Save click');
      })
    }


  }
  onCountrySelected(value:string|undefined){
    this.states =[];
    if(value){
      let countryId = parseInt(value);
      this.commonService.getStates(countryId).subscribe((res)=>{
        this.states = res;
          })
    }

  }
}
