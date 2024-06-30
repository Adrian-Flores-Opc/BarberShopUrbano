import { Component,ChangeDetectionStrategy,inject, model, signal  } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BarbersAdministrationService } from '../../../core/barbers-administration.service';
import { getAvailableBarbersModels } from '../../../models/viewbookings/barbers-administration.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle, } from '@angular/material/dialog';
import { DialogOverViewCellphoneVerificationComponent } from '../openDialogs/dialog-over-view-cellphone-verification/dialog-over-view-cellphone-verification.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { cellphoneVerification } from '../../../models/viewbookings/barbers-administration.model';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})



export class BookingsComponent {
  readonly cellphone = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  public _getAvailableBarbersModels !: getAvailableBarbersModels;

  constructor(private _barbersService: BarbersAdministrationService) { 

  }

  ngOnInit(): void {
    this._getAvailableBarbersModels = new getAvailableBarbersModels();
    // this.getAvailableBarbers();
    this.openDialog();
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverViewCellphoneVerificationComponent, {
      data: {cellphone: this.cellphone},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('SE CIERRA MODAL CON EL SIGUIENTE VALOR: ' + JSON.stringify(result) + ' - ' + this.cellphone);
      if (result !== undefined) {
        this.cellphone.set(result);
      }
      if (result.event == "OK"){
        
      }

    });
  }
}