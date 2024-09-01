import { Component, inject, model, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle, } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { cellphoneVerification } from '../../../../models/viewbookings/barbers-administration.model';

import { BarbersAdministrationService } from '../../../../core/barbers-administration.service';
import { getAvailableBarbersModels } from '../../../../models/viewbookings/barbers-administration.model';

import { MatIconModule } from '@angular/material/icon';
import { cellphoneFilter } from '../../../../models/viewusers/user-administration.model.model';


@Component({
  selector: 'app-dialog-over-view-cellphone-verification',
  standalone: true,
  imports: [ MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatIconModule ],
  templateUrl: './dialog-over-view-cellphone-verification.component.html',
  styleUrl: './dialog-over-view-cellphone-verification.component.scss'
})
export class DialogOverViewCellphoneVerificationComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<DialogOverViewCellphoneVerificationComponent>);
  // readonly data = inject<cellphoneFilter>(MAT_DIALOG_DATA);
  // readonly cellphone = model(this.data.cellphone);

  public _getAvailableBarbersModels !: getAvailableBarbersModels;
  public _cellphoneFilter !: cellphoneFilter;

  constructor(private _barbersService: BarbersAdministrationService) {

  }

  ngOnInit(): void {
    this._getAvailableBarbersModels = new getAvailableBarbersModels();
    this._cellphoneFilter = new cellphoneFilter;
  }

  public onNoClick(): void {
    this.dialogRef.close({ event: 'onNoClick'});
  }

  public verificationClick(): void{
    console.log('ES OBTUVO EL SIGUIENTE NUMERO: ' + JSON.stringify(this._cellphoneFilter));
    this.dialogRef.close({ event: 'verification', data: this._cellphoneFilter });
  }

  public verificationCellphone(cellphone: string): void{
    console.log('ES OBTUVO EL SIGUIENTE NUMERO: ' + cellphone);
    // this.getAvailableBarbers();
  }

}
