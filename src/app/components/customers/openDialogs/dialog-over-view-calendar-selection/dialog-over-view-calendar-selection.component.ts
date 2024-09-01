import { Component, Inject, inject, model, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle, } from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import  moment  from "moment";
import { DialogOverViewScheduleSelectionComponent } from '../dialog-over-view-schedule-selection/dialog-over-view-schedule-selection.component';
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
  readonly dialog = inject(MatDialog);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { idBarber: number }) {

  }

  ngOnInit(): void {

  }

  public onNolick(): void {
    this.dialogRef.close({ event: 'onNoClick' });
  }

  public openDialog(dateSelected: string, idBarberAvailable: number): void{
    const dialogRef = this.dialog.open(DialogOverViewScheduleSelectionComponent, {
      data: { date: dateSelected, idBarber: idBarberAvailable },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public onSelectedCalendar(): void{
    let _date: string = JSON.stringify(this.selected());
    console.log("FECHA SELECCIONADA: " + _date)
    let selected : Date | null = this.selected();
    let selectedDate: Date = selected !== null ? selected : new Date();
    let year = selectedDate.getFullYear();
    let month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
    let day = selectedDate.getDate().toString().padStart(2, '0');
    let _dateString: string = `${year}${month}${day}`;
    console.log("FECHA FORMATER:" + _dateString);
    this.openDialog(_dateString, this.data.idBarber);
  }
}
