import { Component, inject, model, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle, } from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import  moment  from "moment";
// import {format} from 'date-fns';

@Component({
  selector: 'app-dialog-over-view-calendar-selection',
  standalone: true,
  imports: [MatCardModule, MatDatepickerModule, CommonModule, MatDialogTitle,MatDialogContent, MatDialogActions, MatButtonModule],
  templateUrl: './dialog-over-view-calendar-selection.component.html',
  styleUrl: './dialog-over-view-calendar-selection.component.scss',
  providers: [provideNativeDateAdapter(), DatePipe]
})
export class DialogOverViewCalendarSelectionComponent implements OnInit {
  selected = model<Date | null>(null);
  readonly dialogRef = inject(MatDialogRef<DialogOverViewCalendarSelectionComponent>);
  constructor(private _datePipe: DatePipe){

  }

  ngOnInit(): void {

  }

  public onNolick(): void {
    this.dialogRef.close({ event: 'onNoClick' });
  }
  public onSelectedCalendar(): void{
    // let event = new Date(this.selected());
    // let date = JSON.stringify(event);
    // date = date.slice(1, 11);
    // console.log('fecha selection: ' + date)
    const dateString = '2021-07-14T00:00:00.000Z';
    
    let _date: string = JSON.stringify(this.selected());
    console.log('SELECTED: ' + this._datePipe.transform(_date.slice(1, 11), "yyyy-MM-dd"));
    let calendarSelected = new Date(_date.slice(1, 11));
    console.log('SELECTED: ' + calendarSelected);

    
  }
  public convert(str: string) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
}
