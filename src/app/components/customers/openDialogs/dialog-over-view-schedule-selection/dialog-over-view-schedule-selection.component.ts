import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, model, OnInit } from '@angular/core';
import { BarbersAdministrationService } from '../../../../core/barbers-administration.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { getTimesByBarberRequest, getTimesByBarberResponse } from '../../../../models/viewbookings/barbers-administration.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-dialog-over-view-schedule-selection',
  standalone: true,
  imports: [ NgFor, NgIf, CommonModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatIconModule, MatListModule ],
  templateUrl: './dialog-over-view-schedule-selection.component.html',
  styleUrl: './dialog-over-view-schedule-selection.component.scss'
})
export class DialogOverViewScheduleSelectionComponent implements OnInit {
  public _request !: getTimesByBarberRequest;
  public _response !: getTimesByBarberResponse;

  constructor(private _barbersService: BarbersAdministrationService, public dialogRef: MatDialogRef<DialogOverViewScheduleSelectionComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

  }
  ngOnInit(): void {
    console.log('DATA: ' + JSON.stringify(this.data));
    this._request = new getTimesByBarberRequest();
    this._response = new getTimesByBarberResponse();
    this._response.avilablesTimesBarber = [];
    this.getTimesByBarderSelection();
  }


  public getTimesByBarderSelection(): void{
    this._request.trace = 'Pokemonchis';
    this._request.idBarber = this.data.idBarber;
    this._request.date = this.data.date;
    this._barbersService.getTimesByBarber(this._request).subscribe({ next: (response) => {
      this._response = response;
      console.log('RESPONSE HORARIOS DISPONIBLES: ' + JSON.stringify(this._response));
    }, error: (error) => {

    }, complete:() => {

    }});
  }
}
