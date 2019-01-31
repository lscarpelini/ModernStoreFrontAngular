import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: '',  component: LoginPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'signup', component: SignUpPageComponent },
  { path: 'cart', canActivate: [AuthService] ,component: CartPageComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
