import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { createClient } from '../../../../../models/viewusers/user-administration.model.model';

@Component({
  selector: 'app-dialog-add-client',
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
  ],
  templateUrl: './dialog-add-client.component.html',
  styleUrl: './dialog-add-client.component.scss'
})
export class DialogAddClientComponent {
  public client!:createClient;
  readonly dialogRef = inject(MatDialogRef<DialogAddClientComponent>);

  ngOnInit(): void{
    this.client = new createClient();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ClickOk(): void {
    this.dialogRef.close({event: 'Ok', data:this.client});
  }
}
