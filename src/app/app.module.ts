//Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

//Rotas
import { AppRoutingModule } from './app-routing.module';

//Root
import { AppComponent } from './app.component';

//Shared
import { HeadbarComponent } from './components/shared/headbar/headbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';

//Component
import { ProductListComponent } from './components/product-list/product-list.component';

//Directives
import { NumberDirective } from './directives/number.directive';

//Pages
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

//Services (Iniciam a primeira vez que a aplicação iniciar)
import { CartService } from './services/cart.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HeadbarComponent,
    ProductListComponent,
    FooterComponent,
    HomePageComponent,
    LoginPageComponent,
    SignUpPageComponent,
    CartPageComponent,
    NumberDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CartService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
