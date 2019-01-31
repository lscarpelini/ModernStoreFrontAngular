import { Injectable } from '@angular/core'
//CanAtivate é um metodo que todo controller passa antes de ser carregado   
import { Router, CanActivate } from '@angular/router'; 

@Injectable()
export class  AuthService implements CanActivate{
    constructor(private router: Router){
    }

    canActivate(){
        
        if(!localStorage.getItem('mswt.token')){
            this.router.navigateByUrl('/');//Redireciona para o login
            return false;
        }

        var data: any = JSON.parse(localStorage.getItem('mswt.user'));
        if(!data){
            this.router.navigateByUrl('/');//Redireciona para o login
            return false;
        }
    
        return true;
    }
}