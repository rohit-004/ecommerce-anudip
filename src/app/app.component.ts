import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from './Models/AppState';
import { Store, select } from '@ngrx/store';
import { UserService } from './State/User/user.service';
import { CartService } from './State/Cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ecommerce-anudipp';

  constructor(
    private router: Router,
    private userService: UserService ,
    private cartService: CartService,
    private store: Store<AppState>,
  
  ) {
    
  }

  ngOnInit() {
    if(localStorage.getItem("jwt"))
    this.userService.getUserProfile();
    this.cartService.getCart();


    this.store.pipe(select((store) => store.auth)).subscribe((user) => {
      this.cartService.getCart();
      this.userService.getUserProfile();
      console.log("Store ", user);
      
    });

  }


}
