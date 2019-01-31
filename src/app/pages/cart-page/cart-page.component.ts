import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html'
})
export class CartPageComponent implements OnInit {

  public items: any[] = [];
  public total: number;
  public discount: number = 100;
  public deliveryFee: number = 15;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.items = this.cartService.items;
  }

  remove(item: any){
    console.log(item.id);
    this.cartService.removeItem(item.id);
  }

  checkQuantity(item){
    if(item.quantity < 1){
      item.quantity = 1;
    }
  }

  getSubTotal(): number {
    return this.cartService.getSubTotal();
  }

  applyDiscount(item) {
    this.cartService.getSubTotal();
  }


}
