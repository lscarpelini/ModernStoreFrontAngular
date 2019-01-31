//Usar Injectable quando usar serviços
import { Injectable } from '@angular/core';
//Usar para chamadas Http
import { Http, Response, RequestOptions } from '@angular/http';
//Usar observable para retorno de requisições (no lugar de promisses)
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
//Para passar header no http da requisição
import { Headers } from '@angular/http'

@Injectable()
export class DataService{

    //Url do servico
    private serviceUrl : string = 'http://localhost:51973/';

    //Contrutor passa as classes http para requisições
    constructor(private http: Http){

    }

    //Metodo de Criar usuário que recebe parametro genérico
    createUser(data: any){
        return this.http
                   .post(this.serviceUrl + 'v1/customers', data)
                   .map((res:Response) => res.json()); //Mapiamento para resposta
    }

    authencticate(data:any){
        var dt = "grant_type=password&username=" + data.userName + "&password=" + data.password;
        let headers = new Headers({ 'content-type':'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.serviceUrl + "v1/authenticate",dt, options).map((res: Response)=> res.json());
    }

    //Metodo para buscar os produtos
    getProduct(){
        return this.http
                   .get(this.serviceUrl + 'v1/products')
                   .map((res:Response) => res.json()); //Mapiamento para resposta
    }

    //Servico de validação de token criar na API
    validateToken(token: string){
        return true;
    }

    // getCursosExemplo(){
    //     return this.http
    //                .get('https://abt-api.azurewebsites.net/api/courses')
    //                .map((res:Response) => res.json()); //Mapiamento para resposta
    // }

}
