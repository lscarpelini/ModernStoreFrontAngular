//Usar Injectable quando usar serviços
import { Injectable } from '@angular/core';
//Observer um objeto que serve para observar um objeto do sistema
//Nesse caso será usado para o contador dos itens do carrinho
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

@Injectable()

//Classe para ficar escutado os itens do carrinho
export class CartService{
    public items: any[] = []; 
    public total: number;
    cartChange: Observable<any>; 
    cartChangeObserver: Observer<any>;

    constructor(){
        this.cartChange = new Observable((observer: Observer<any>) =>{
            this.cartChangeObserver = observer;
        })
        this.total = 100;

    }

    addItem(item){
        this.getItems();
        if(this.hasItem(item.id)){
            console.log('Update');
            this.updateQuantity(item.id, 1);
        } else {
            console.log('Push');
            this.items.push(item)
        }
        localStorage.setItem('mswt.cart', JSON.stringify(this.items)); 
        this.cartChangeObserver.next(this.items);  
    }

    updateQuantity(id, quantity){
        for(var item of this.items){
            if(item.id == id){
                item.quantity += +quantity;
            }
        }
    }

    //Verifica se já existe no carrinho
    hasItem(id): boolean{
        for(var item of this.items){
            if(item.id == id){
                return true;
            }
        }

        this.cartChangeObserver.next(this.items);   
        return false;               
    }

    //Cria um token de controle para o carrinho
    saveCart(){
        localStorage.setItem('mswt.cart', JSON.stringify(this.items));
    }

    //Le o carrinho de compras
    loadCart(){
        var data = localStorage.getItem('mswt.cart');
        if(data){
            this.items = JSON.parse(data);//Converte o JSON do token de data
        }
        this.cartChangeObserver.next(this.items);
    }

    getItems():any[] {
        var data = localStorage.getItem('mswt.cart'); 
        if(data){
            this.items = JSON.parse(data);
        }
        this.cartChangeObserver.next(this.items);  
        return this.items;                
    }

    removeItem(id: string){
        for(var item of this.items){
            if(item.id == id){
                var index =  this.items.indexOf(item); //Seleciona o item
                this.items.splice(index, 1); //Remove o item
            }
        }
        localStorage.setItem('mswt.cart', JSON.stringify(this.items)); 
        this.cartChangeObserver.next(this.items);                  
    }

    getSubTotal(): number {
        var result: number = 0;
        for (let i of this.items){
            result += +(+i.price * +i.quantity);
        }
        this.cartChangeObserver.next(this.items);  
        return result; 
    }
}