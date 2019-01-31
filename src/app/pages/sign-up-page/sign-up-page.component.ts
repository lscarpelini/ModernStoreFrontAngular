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
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  providers: [Ui, DataService]
})
export class SignUpPageComponent implements OnInit {

  //Formulário 
  public form: FormGroup;
  //Variavel de Erros ARRAY
  public errors: any[] = [];

  //Construtor recebe o contrutor do form (Propriedades do form devem ser as mesmas do formControlName)
  constructor(private fb: FormBuilder, private ui: Ui, private dataService: DataService, private router: Router) {
    this.form = this.fb.group({
      firstName: ['Lucas', Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(160),
        Validators.required
      ])],

      lastName: ['Scarpelini', Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(160),
        Validators.required
      ])],

      email: ['lsj@hotmail.com', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required,
        CustomValidator.EmailValidator
      ])],

      document: ['', Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(160),
        Validators.required
      ])],

      userName: ['', Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(160),
        Validators.required
      ])],
      
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])],

      confirmPassword: ['', Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(160),
        Validators.required
      ])],
    });
 }

  ngOnInit() {
  }

  submit(){
    this
    .dataService
    .createUser(this.form.value)
    .subscribe(
      result=>{ 
        alert("Bem vindo ao ModernStore")
        this.router.navigateByUrl('/');//Redireciona para o login
      }, 
      error=>{ 
        this.errors = JSON.parse(error._body).errors;
        console.log(this.errors);
      }
    )
  }
}
