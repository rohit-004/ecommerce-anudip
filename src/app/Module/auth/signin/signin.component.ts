import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../State/Auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
@Input() changeTemplate:any

constructor(private formBuilder:FormBuilder, private store:Store, private authService:AuthService){}

loginForm : FormGroup = this.formBuilder.group({
  email:['',[Validators.required, Validators.email]],
  password:["",[Validators.required, Validators.minLength(8)]]
})

submitForm():void{
  if(this.loginForm.valid){
    this.authService.login(this.loginForm.value)
    console.log("login req data ", this.loginForm.value);
    
  }
}
}
