import { Component,ChangeDetectionStrategy,inject, model, signal,OnInit, ChangeDetectorRef, NgZone  } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BarbersAdministrationService } from '../../../core/barbers-administration.service';
import { getAvailableBarbersModels, getAvailableBarbersViewsModels } from '../../../models/viewbookings/barbers-administration.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle, } from '@angular/material/dialog';
import { DialogOverViewCellphoneVerificationComponent } from '../openDialogs/dialog-over-view-cellphone-verification/dialog-over-view-cellphone-verification.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { cellphoneVerification } from '../../../models/viewbookings/barbers-administration.model';
import { filterClientRequest, cellphoneFilter } from '../../../models/viewusers/user-administration.model.model';
import { Subject } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DialogOverViewClientRegistrationComponent } from '../openDialogs/dialog-over-view-client-registration/dialog-over-view-client-registration.component';


@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, NgFor, NgIf, MatDatepickerModule, MatNativeDateModule, NgxMaterialTimepickerModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss'
})



export class BookingsComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  public _getAvailableBarbersModels !: getAvailableBarbersModels;
  public _requestFilterCellphone !: filterClientRequest;
  public _cellphoneFilter !: cellphoneFilter;
  public _availableBarbers$: Subject<getAvailableBarbersModels> = new Subject<getAvailableBarbersModels>();
  public availableBarbers: any;
  public _getAvailableBarbersViewsModels !: getAvailableBarbersViewsModels;

  constructor(private _barbersService: BarbersAdministrationService) { }

  ngOnInit(): void {
    this._getAvailableBarbersModels = new getAvailableBarbersModels();
    this._requestFilterCellphone = new filterClientRequest();
    this._cellphoneFilter = new cellphoneFilter();
    this.openDialog();
    this._getAvailableBarbersViewsModels = new getAvailableBarbersViewsModels();
    this._getAvailableBarbersViewsModels.viewBarbersDetail = [];
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverViewCellphoneVerificationComponent, {
      data: { cellphone: this._cellphoneFilter.cellphone },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('SE CIERRA MODAL CON EL SIGUIENTE VALOR: ' + JSON.stringify(result) + ' - ' + this._cellphoneFilter.cellphone);
      if (result !== undefined) {
        this._cellphoneFilter.cellphone = result.data.cellphone;
        if (result.event == "verification"){
          console.log('DATO CELL: ' + JSON.stringify(this._cellphoneFilter))
          this.ValidationCellphone(this._cellphoneFilter.cellphone);
        }
      }
    });
  }

  public openDialogClientRegistration(): void {
    const dialogRef = this.dialog.open(DialogOverViewClientRegistrationComponent, {

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
            console.log('SE DEBE INICIAR OTRO MODAL PARA EL REGISTRO DEL CLIENTE:');
            this.openDialogClientRegistration();
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
                let _counter : number = 0;
                let _addNewBarber = new getAvailableBarbersModels();
                _addNewBarber.barbers = [];
                this._getAvailableBarbersModels.barbers.forEach((barber, index) => {
                  _addNewBarber.barbers.push(barber); _counter++;
                  console.log('INDEX RESPONSE: ' + index + ' - ' + _counter + ' - ' + this._getAvailableBarbersModels.barbers.length + ' - ');

                  if (_counter  === 3 || (index + 1 ) === this._getAvailableBarbersModels.barbers.length) {
                    const _addNewBarberAux = _addNewBarber;
                    console.log('AGREGACION PUSH: ' + JSON.stringify(_addNewBarberAux));
                    this._getAvailableBarbersViewsModels.viewBarbersDetail.push(_addNewBarberAux);
                    _counter = 0;
                    console.log('AGREGACION PUSH AFTER: ' + JSON.stringify(this._getAvailableBarbersViewsModels));
                    _addNewBarber.barbers = [];
                  }
                });
                console.log('JSON FINAL RESPONSE: ' + JSON.stringify(this._getAvailableBarbersViewsModels));
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

  public searchReservation(idBarber: number): void{
    console.log('BARBER: ' + idBarber);
  }
}
