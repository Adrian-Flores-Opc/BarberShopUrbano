import { Component,ChangeDetectionStrategy,inject, model, signal,OnInit  } from '@angular/core';
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
import { filterClientRequest, cellphoneFilter } from '../../../models/viewusers/user-administration.model.model';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush
})



export class BookingsComponent implements OnInit {
  readonly cellphone = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  public _getAvailableBarbersModels !: getAvailableBarbersModels;
  public _requestFilterCellphone !: filterClientRequest;
  public _cellphoneFilter !: cellphoneFilter;

  constructor(private _barbersService: BarbersAdministrationService) { 

  }

  ngOnInit(): void {
    this._getAvailableBarbersModels = new getAvailableBarbersModels();
    this._requestFilterCellphone = new filterClientRequest();
    this._cellphoneFilter = new cellphoneFilter();
    // this.getAvailableBarbers();
    this.openDialog();
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverViewCellphoneVerificationComponent, {
      data: { cellphone: this._cellphoneFilter.cellphone },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('SE CIERRA MODAL CON EL SIGUIENTE VALOR: ' + JSON.stringify(result) + ' - ' + this._cellphoneFilter.cellphone);
      if (result !== undefined) {
        this._cellphoneFilter.cellphone = result.data.cellphone;
      }
      if (result.event == "verification"){
        console.log('DATO CELL: ' + JSON.stringify(this._cellphoneFilter))
        this.ValidationCellphone(this._cellphoneFilter.cellphone);
      }

    });
  }

  public ValidationCellphone(cellphone:string): void{
    try{
      this._requestFilterCellphone.cellphone = cellphone;
      this._requestFilterCellphone.typeFilter = 'CELLPHONE';
      this._barbersService.filterInformationClient(this._requestFilterCellphone).subscribe({ next: (_response) => {
        console.log(_response);
        if (_response.detailMessage === "DATA NOT FOUND" && _response.respCode === "001"){
            // LEVANTAR MODAL PARA REGISTRO DE DATOS 
        }
        else {
            // LISTAR BARBEROS DISPONIBLES
            this._barbersService.getAvailableBarbers().subscribe({ next: (_responseBarbers) => {
              this._getAvailableBarbersModels = _responseBarbers;
              console.log('barbers disponibles: ' + JSON.stringify(this._getAvailableBarbersModels));
              if (this._getAvailableBarbersModels.detailMessage === "DATA NOT FOUND" && this._getAvailableBarbersModels.respCode === "001") {
                // NO SE TIENE BARBEROS DISPONIBLES 
              }
              else {
                // DIBUJAR BARBEROS DISPONIBLES A NIVEL VISTA 

              }
            }, error: (_error) => {

            }, complete:() => {

            } });
        }
        
      }, error: (_error) => {
        console.log(_error);
      }, complete:() => {
        console.log('Complete');
      }});
    } catch (error) {
      console.log(error);
    }
  }
}