import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Perfil, UserCreateRequest, UserModel } from '../../../../../models/viewusers/user-administration.model.model';
import { UserAdministrationService } from '../../../../../core/user-administration.service';

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
  selectedValue!: number;
  selectedCar!: string;
  perfils: Perfil[]  = [];
  public usuario!:UserCreateRequest;
  public user!: UserModel;
  readonly dialogRef = inject(MatDialogRef<DialogOverviewUserDialog>);
  constructor(private perfilsService:UserAdministrationService){

  }
  ngOnInit(): void{
    this.usuario = new UserCreateRequest();
    this.user = new UserModel();

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
    this.dialogRef.close({event: 'Ok', data:this.usuario});
  }
  handleFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.convertToBase64(file);
    }
  }
  convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      console.log('Base64:', base64String);
      const base64Fragment = base64String.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
      console.log('Fragmento base64:', base64Fragment);
      this.usuario.user.image = base64Fragment;
    };
    reader.readAsDataURL(file);
  }
}
