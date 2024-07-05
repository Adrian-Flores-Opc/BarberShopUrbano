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
;
  
  ngOnInit(): void{
    this.barber = new barbersModels();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ClickOk(): void {
    this.dialogRef.close({event: 'Ok', data:this.barber});
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
      this.barber.image = base64String;
      // Aquí puedes asignar el base64 a una propiedad de tu modelo si lo necesitas
    };
    reader.readAsDataURL(file);
  }
}