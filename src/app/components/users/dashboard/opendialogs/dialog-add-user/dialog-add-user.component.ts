import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Perfil, UserCreateRequest, UserModel } from '../../../../../models/viewusers/user-administration.model.model';
import { UserAdministrationService } from '../../../../../core/user-administration.service';
import { UserAuthentication } from '../../../../../models/viewlogin/user-authentication.model';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule,
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogOverviewUserDialog {
  selectedValue!: string;
  perfils: Perfil[]  = [];
  public usuario!:UserCreateRequest;
  public user!: UserModel;
  public login!: UserAuthentication;
  readonly dialogRef = inject(MatDialogRef<DialogOverviewUserDialog>);
  constructor(private perfilsService:UserAdministrationService){

  }
  ngOnInit(): void{
    this.usuario = new UserCreateRequest();
    this.user = new UserModel();
    this.login = new UserAuthentication();
    this.getPerfils();
  }
  public getPerfils(): void{
    this.perfilsService.getAvailablePerfils().subscribe({next:(response)=>{
      console.log(response);
      console.log(this.perfils);
      this.perfils = response.perfils;
      console.log(this.perfils);
      this.selectedValue = this.perfils[0].id;      
    }})
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ClickOk(): void {
    this.usuario.idPerfil = this.selectedValue;
    this.usuario.user = this.user;
    this.usuario.loginUser = this.login;
    this.dialogRef.close({event: 'Ok', data:this.usuario});
  }    
}
