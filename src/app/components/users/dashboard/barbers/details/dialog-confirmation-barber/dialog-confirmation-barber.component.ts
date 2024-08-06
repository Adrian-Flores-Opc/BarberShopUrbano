import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirmation-barber',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './dialog-confirmation-barber.component.html',
  styleUrl: './dialog-confirmation-barber.component.scss'
})
export class DialogConfirmationBarberComponent {
  readonly dialogRef = inject(MatDialogRef<DialogConfirmationBarberComponent>);
}
