import {ChangeDetectionStrategy, Component, inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { barbersModels } from '../../../../../models/viewbookings/barbers-administration.model';

@Component({
  selector: 'dialog-add-barber',
  templateUrl: 'dialog-add-barber.component.html',
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
})
export class DialogOverviewExampleDialog {  
  public barber!:barbersModels;
  readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);
  readonly data = inject<barbersModels>(MAT_DIALOG_DATA);
  readonly lastname = model(this.data);
  
  ngOnInit(): void{
    this.barber = new barbersModels();
  }
  onNoClick(): void {
    this.dialogRef.close({event: 'Ok', data:this.data});
  }
}