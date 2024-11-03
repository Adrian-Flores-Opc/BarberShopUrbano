import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, model, OnInit } from '@angular/core';
import { BarbersAdministrationService } from '../../../../core/barbers-administration.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { getTimesByBarberRequest, getTimesByBarberResponse, generateReservationClientRequest, generateReservationClientResponse } from '../../../../models/viewbookings/barbers-administration.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { CommonOperations } from '../../../../Common/common.operations';

@Component({
  selector: 'app-dialog-over-view-schedule-selection',
  standalone: true,
  imports: [ NgFor, NgIf, CommonModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatIconModule, MatListModule, MatSelectModule ],
  templateUrl: './dialog-over-view-schedule-selection.component.html',
  styleUrl: './dialog-over-view-schedule-selection.component.scss',
  providers: [CommonOperations]
})
export class DialogOverViewScheduleSelectionComponent implements OnInit {
  public _request !: getTimesByBarberRequest;
  public _response !: getTimesByBarberResponse;

  public _requestReservation !: generateReservationClientRequest;
  public _responseReservation !: generateReservationClientResponse;

  public _titleModal!: string;
  form: FormGroup;
  public _selectedSchedule !: number;
  // shoesControl = new FormControl();

  constructor(private _barbersService: BarbersAdministrationService, public dialogRef: MatDialogRef<DialogOverViewScheduleSelectionComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private _commons: CommonOperations) {
    this.form = new FormGroup({
      // clothes: this.shoesControl,
    });
  }
  ngOnInit(): void {
    console.log('DATA: ' + JSON.stringify(this.data));
    this._request = new getTimesByBarberRequest();
    this._response = new getTimesByBarberResponse();
    this._response.avilablesTimesBarber = [];
    this.getTimesByBarderSelection();
    this._titleModal = "Horarios Disponibles";
    this._selectedSchedule = 0;
    this._requestReservation = new generateReservationClientRequest();
    this._responseReservation = new generateReservationClientResponse();
  }


  public getTimesByBarderSelection(): void{
    this._request.trace = 'Pokemonchis';
    this._request.idBarber = this.data.idBarber;
    this._request.date = this.data.date;
    this._barbersService.getTimesByBarber(this._request).subscribe({ next: (response) => {
      this._response = response;
      if (this._response.detailMessage === "DATA NOT FOUND"){
        this._titleModal = "No se cuenta con horarios disponibles para el barbero seleccionado."
      }
      else {
        
      }
      console.log('RESPONSE HORARIOS DISPONIBLES: ' + JSON.stringify(this._response));
    }, error: (error) => {

    }, complete:() => {

    }});
  }

  public onNolick(): void {
    this.dialogRef.close({ event: 'onNoClick' });
  }

  public setSelectedSchedule(idValue: number) :void {
    if (idValue !== null){
      this._selectedSchedule = idValue;
      console.log(this._selectedSchedule);
    }
  }

  public selectedScheduleHours():void{
    if (this._selectedSchedule !== null && this._selectedSchedule !== 0){
      console.log('reservado OK');
      this._requestReservation.trace = 'POKEMONCHIS';
      this._requestReservation.idClient = this.data.idBarber;
      this._requestReservation.idRelationBarberTurn = this._selectedSchedule;
      this._barbersService.generateReservationClient(this._requestReservation).subscribe({ next: (response) => {
        this._responseReservation = response;
        console.log(JSON.stringify(this._responseReservation));
        if (this._responseReservation.detailMessage !== "RESERVATION NOT REGISTER"){
          this._commons.showAlert(this._responseReservation.detailMessage, "success","#FFF","#000");
        }
        else {
          this._commons.showAlert(this._responseReservation.detailMessage, "error","#FFF", "#000");
        }
        
      }, error: (error) => {

      }, complete: () => {

      }});
      this.dialogRef.close({ event: 'onNoClick' });
    }
    else{
      console.log('seleccione horario');
      this._commons.showAlert("Seleccione un horario", "info","#FFF", "#000");
    }
  }

}
