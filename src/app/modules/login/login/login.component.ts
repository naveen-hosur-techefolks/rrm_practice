import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { loginrequest } from 'src/app/core/models/loginrequest';
import { CommonService } from 'src/app/core/services/common/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoginError: boolean | undefined;
  constructor(private formBuilder: FormBuilder,
    private readonly commonService: CommonService,
    private readonly router: Router,
    private readonly jwtHelperService: JwtHelperService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (!this.jwtHelperService.isTokenExpired()) {
      this.router.navigate(['catalog']);
    }

  }
  syncCartItems() {
    const cartItems = localStorage.getItem('cartItems');
    if(cartItems){
      this.commonService.syncCartItems(JSON.parse(cartItems)).subscribe((response)=>{
        console.log(response);
        this.router.navigate(['catalog']);
        localStorage.removeItem('cartItems');
        window.location.reload();
      })
    }
    
  }

  loginClick() {
    this.commonService.login(this.loginForm.value).subscribe((response) => {
      localStorage.setItem('rrm_token', response.token)
      if (localStorage.getItem('cartItems')) {
        this.syncCartItems();
      } else {
        this.router.navigate(['catalog']);
        window.location.reload();
      }

    },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
      });
  }
}
