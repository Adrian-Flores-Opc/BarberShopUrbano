import { Component, inject, model } from '@angular/core';
import { InformationUser, Perfil, UpdateUserRequest, UserAdministrationModel, UserModel } from '../../../../../models/viewusers/user-administration.model.model';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { UserAdministrationService } from '../../../../../core/user-administration.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserAuthentication } from '../../../../../models/viewlogin/user-authentication.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';
import { Observable } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import { CommonOperations } from '../../../../../Common/common.operations';

@Component({
  selector: 'app-detail.user',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule, MatInputModule, FormsModule, MatSelectModule, MatCheckboxModule,MatIconModule],
  templateUrl: './detail.user.component.html',
  styleUrl: './detail.user.component.scss',
  providers: [CommonOperations],
})
export class DetailUserComponent {
  readonly dialog = inject(MatDialog);
  public resetPassword! : boolean;
  selectedValue!: string;
  perfils: Perfil[]  = [];
  public user!: InformationUser;
  public login!: UserAuthentication;
  showUpdateButton = true; // Por defecto, el botón está visible
  showConfirmButton = false; // Por defecto, el botón está visible
  public userResponse!:UserAdministrationModel; 
  public idUser!:string;
  public userUpdateqRequest!:UpdateUserRequest;
  isReadOnly = true; // Por defecto, el campo está en modo de solo lectura  
  constructor(private perfilsService:UserAdministrationService, private userService:UserAdministrationService, private route: ActivatedRoute, private router: Router, private common: CommonOperations){
  }
  ngOnInit(): void{ 
    this.route.paramMap.subscribe((params: ParamMap) => {
      console.log('DATO ROUTER: ' + params.get('id'))
    }); 
    this.resetPassword = false;
    this.idUser = this.route.snapshot.paramMap.get('id') || "";
    this.userResponse = new UserAdministrationModel();
    this.userUpdateqRequest = new UpdateUserRequest();  
    this.userUpdateqRequest.dataBasic = new UserModel();
    this.user = new InformationUser();
    this.login = new UserAuthentication();
    this.getPerfils();
    this.getUser();
  }
  public getPerfils(): void{
    this.perfilsService.getAvailablePerfils().subscribe({next:(response)=>{
      this.perfils = response.perfils;
    }})
  }
  toggleReadOnly() {    
    this.showUpdateButton = false;
    this.showConfirmButton = true;
    this.isReadOnly = false;   
    }

toggleCancel() {
  this.showUpdateButton = true;
  this.showConfirmButton = false;
  this.getUser();
  this.resetPassword = false;
  this.isReadOnly = true;
}
updateUser() {
  console.log(this.userResponse)
  this.showUpdateButton = true;
  this.showConfirmButton = false;
  this.isReadOnly = true;
  this.userUpdateqRequest.trace="123456";
  console.log(JSON.stringify(this.user));
  this.userUpdateqRequest.idPerfil = parseInt(this.selectedValue, 10);
  this.userUpdateqRequest.idUser = parseInt(this.idUser, 10);
  this.userUpdateqRequest.dataBasic.lastName = this.user.lastName;
  this.userUpdateqRequest.dataBasic.motherLastName = this.user.motherLastName;
  this.userUpdateqRequest.dataBasic.names = this.user.names;  
  this.userUpdateqRequest.resetPass = this.resetPassword;
  console.log(JSON.stringify(this.userUpdateqRequest));
  this.userService.sendUpdateUser(this.userUpdateqRequest).subscribe({next:(response)=>{
    console.log("RESPONSE: " + response.respCode);
    if(response.respCode === '00')
      {
        this.common.showAlert("User Update Succesfull","success","#000","#FFF");
        this.getUser();
        this.resetPassword = false;
      }
      else{
        this.common.showAlert("An error was generated, contact the administrator","error","#000","#FFF");
      }          
  }})
}
deleteUser() {
  this.openDialog('0ms','0ms').subscribe(result => {
    console.log(`Dialog result: ${result}`);
    if(result=== true)
    {
      this.userService.deletedUser(this.idUser).subscribe({next:(response)=>{
        console.log("RESPONSE: " + response.respCode);
        if(response.respCode === '00')
          {            
            alert("Se eliminó el usuario correctamente");
            this.router.navigate(['/Users/Dashboard/Users']);
          }
          else{
            alert("No se eliminó el usuario correctamente");
          }          
      }}) 
    }
  });  
}
onModelChange(newValue: boolean) {
  console.log('Nuevo valor de checked:', newValue);
  this.resetPassword = newValue;
}
  public getUser(): void{
    this.userService.getAvailableUser(this.idUser).subscribe({next:(response)=>{
      console.log(JSON.stringify(response));
      if(response.respCode=="00")
      {
        this.user = response.users[0].information;
        this.login = response.users[0].loginInfo;
        this.selectedValue = response.users[0].perfil.id;
      }      
    }})
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): Observable<any> {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    return dialogRef.afterClosed();
  }  
  backFunction(){
    this.router.navigate(['/Users/Dashboard/Users']);
  }
}
