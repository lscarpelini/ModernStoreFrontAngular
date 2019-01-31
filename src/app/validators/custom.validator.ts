import { FormControl } from '@angular/forms';

export class CustomValidator{

    //Metodo de validação do email
    static EmailValidator(email: FormControl){
        var re = /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/;
        if(!re.test(email.value))
        {
            return {"E-mail Inválido" : true}
        }
        return null;
    }

}