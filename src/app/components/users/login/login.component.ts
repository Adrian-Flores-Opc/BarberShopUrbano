import { Component,Renderer2, ElementRef, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { UntypedFormGroup, Validators, UntypedFormControl, FormBuilder, FormGroup } from '@angular/forms';
import { UserAuthentication } from '../../../models/viewlogin/user-authentication.model';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgModel, NgForm } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  registerForm!: UntypedFormGroup;
  hide = true;
  public _modelLogin !: UserAuthentication;
  constructor(private _router: Router){

  }


  ngOnInit(): void {
    this._modelLogin = new UserAuthentication();
    this.registerForm = new UntypedFormGroup({
      user: new UntypedFormControl({ value: '', disabled: false}, [Validators.required, Validators.minLength(4)] ),
      password: new UntypedFormControl({ value: '', disabled: false}, [Validators.required, Validators.minLength(4)] )
    });
  }

  get f() {return this.registerForm.controls;}

  public submitLogin(_request: UserAuthentication): void{
    console.log(_request);
    this._router.navigate(['/Users/Dashboard']);
  }
}
