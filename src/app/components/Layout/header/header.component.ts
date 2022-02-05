import { Component, OnDestroy, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, Subscription } from 'rxjs';
import { DataService } from 'src/app/core/services/data/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoginAvailable: boolean;
  cartCount$: Observable<number> | undefined;

  constructor(private jwtHelperService: JwtHelperService, private dataService: DataService) {
    this.isLoginAvailable = false;

    this.cartCount$ = this.dataService.getCartCount();
  }

  ngOnInit(): void {
    this.isLoginAvailable = localStorage.getItem('rrm_token') !== null && localStorage.getItem('rrm_token') !== undefined;
  }
  logout() {
    localStorage.clear();
    window.location.reload();
    this.isLoginAvailable = false;
  }

}
