import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
//Importar Router para navegar pelo TypeScript
import { Router } from '@angular/router';

@Component({
  selector: 'app-headbar',
  templateUrl: './headbar.component.html'
})
export class HeadbarComponent implements OnInit {

  public totalItems: number = 0;
  public user: string = '';

  constructor(private cartService: CartService,  private router: Router) {
    this.cartService.cartChange.subscribe((data) => {
      this.totalItems = data.length;  
    });

    var data: any = JSON.parse(localStorage.getItem('mswt.user'));

    this.user = data.username;

    this.cartService.loadCart();

   } 

  ngOnInit() {
  }

  //addItem(){
  //  this.cartService.addItem({title: "teste"});
  //}

  logOut(){
    localStorage.removeItem('mswt.token');
    localStorage.removeItem('mswt.user');
    localStorage.removeItem('mswt.cart');
    this.router.navigateByUrl('/');//Redireciona para o login
  }

}
