import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle, } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { cellphoneVerification } from '../../../../models/viewbookings/barbers-administration.model';

import { BarbersAdministrationService } from '../../../../core/barbers-administration.service'; 
import { getAvailableBarbersModels } from '../../../../models/viewbookings/barbers-administration.model';

import { MatIconModule } from '@angular/material/icon';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialog-over-view-cellphone-verification',
  standalone: true,
  imports: [ MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatIconModule ],
  templateUrl: './dialog-over-view-cellphone-verification.component.html',
  styleUrl: './dialog-over-view-cellphone-verification.component.scss'
})
export class DialogOverViewCellphoneVerificationComponent {
  readonly dialogRef = inject(MatDialogRef<DialogOverViewCellphoneVerificationComponent>);
  readonly data = inject<cellphoneVerification>(MAT_DIALOG_DATA);
  readonly cellphone = model(this.data.cellphone);

  public _getAvailableBarbersModels !: getAvailableBarbersModels;

  constructor(private _barbersService: BarbersAdministrationService) { 

  }

  ngOnInit(): void {
    this._getAvailableBarbersModels = new getAvailableBarbersModels();
  }

  public onNoClick(): void {
    this.dialogRef.close({ event: 'onNoClick'});
  }

  public verificationClick(): void{
    this.dialogRef.close({ event: 'verification', data: this.cellphone });
  }

  public verificationCellphone(cellphone: string): void{
    console.log('ES OBTUVO EL SIGUIENTE NUMERO: ' + cellphone);
    this.getAvailableBarbers();
  }

  public getAvailableBarbers(): void {
    try{
      this._barbersService.getAvailableBarbers().subscribe({ next: (_response) => {
        this._getAvailableBarbersModels = _response;
        console.log('OBTENER RESPUESTA: ' + JSON.stringify(this._getAvailableBarbersModels));
        console.log(_response);
      }, error: (_error) =>{
        console.log(_error);
      }, complete:() =>{
        console.log('Complete');
      }});
    } catch (error) {
      console.log(error);
    }
  }
}
