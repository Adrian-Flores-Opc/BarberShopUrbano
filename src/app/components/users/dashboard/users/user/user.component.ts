import {Component} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { UserAdministrationService } from '../../../../../core/user-administration.service';
import { UserAdministrationModel, User, InformationUser } from '../../../../../models/viewusers/user-administration.model.model'
import {inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { DialogOverviewExampleDialog } from '../../opendialogs/dialog-add-barber/dialog-add-barber.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { exec } from 'child_process';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule,MatIconModule,MatDividerModule,MatFormFieldModule, MatInputModule, MatTableModule],
})
export class UserComponent {
  public usersResponse!:UserAdministrationModel; 
  public Element!:InformationUser[];
  // public informationUser!:InformationUser[];
  readonly dialog = inject(MatDialog);
  public displayedColumns: string[] = ['lastname', 'motherlastname', 'names'];
  public dataSource = new MatTableDataSource(this.Element);
  clickedRows = new Set<InformationUser>();
  constructor(private usersService:UserAdministrationService){

  }
  ngOnInit(): void{
    this.usersResponse = new UserAdministrationModel();
    this.getUsers();
  }
  public getUsers(): void{
    this.usersService.getAvailableUsers().subscribe({next:(response)=>{
      console.log(response);

      console.log(response.users.map(user => user.information));
      this.dataSource = new MatTableDataSource(response.users.map(user => user.information));
      
      
    }})
  }
  handleRowClick(row: InformationUser) {
    console.log('entro: ' + row.id);
    // Aquí puedes agregar cualquier otra lógica que necesites
}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }  

}
