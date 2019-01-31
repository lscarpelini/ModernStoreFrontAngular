import { Component, OnInit } from '@angular/core';
//Coleções para o formulario
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
//Importa classe de validação
import { CustomValidator } from '../../validators/custom.validator';
//Importa classe de validação
import { Ui } from '../../utils/ui';
//Importa Serviço de Acesso a Dados
import { DataService } from '../../services/data.service';
//Importar Router para navegar pelo TypeScript
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  providers: [Ui, DataService]
})
export class LoginPageComponent implements OnInit {

  //Formulário 
  public form: FormGroup;

  //Variavel de Erros ARRAY
  public errors: any[] = [];

  //Construtor recebe o contrutor do form (Propriedades do form devem ser as mesmas do formControlName)
  constructor(private fb: FormBuilder, private ui: Ui, private dataService: DataService, private router: Router) {
    this.form = this.fb.group({
      userName: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required
      ])],
      
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    });

    //Verifica se já existe token
    var token = localStorage.getItem('mswt.token');
    //Se tiver token liberar usuário para home
    if(token)
    {
      this.router.navigateByUrl('/');//Redireciona para o login
    }

  }


  ngOnInit() {
  }

  submit(){
    //Para recuperar informações do formulário "this.form.value"
    this
      .dataService
      .authencticate(this.form.value)
      .subscribe(
        result=>{
          //Para amazenamento no localstorage do browser
          localStorage.setItem('mswt.token', result.token);//Armazena token
          localStorage.setItem('mswt.user', JSON.stringify(result.user));//Armazena token
          this.router.navigateByUrl('/home');//Redireciona para o login
        }, 
        error=>{
          this.errors = JSON.parse(error._body).errors;
          console.log(this.errors);
        });
  }

  showModal(){
    this.ui.setActive('modalTermosDeUso');
  }

  hideModal(){
    this.ui.setInactive('modalTermosDeUso');
  }


}
