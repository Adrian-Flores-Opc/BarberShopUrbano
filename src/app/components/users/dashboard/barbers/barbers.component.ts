import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { BarbersAdministrationService } from '../../../../core/barbers-administration.service';
import { getAvailableBarbersModels } from '../../../../models/viewbookings/barbers-administration.model'; 
import { barbersModels } from '../../../../models/viewbookings/barbers-administration.model'
import {inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { DialogOverviewExampleDialog } from '../opendialogs/dialog-add-barber/dialog-add-barber.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
@Component({
  selector: 'app-barbers',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule,MatIconModule,MatDividerModule],
  templateUrl: './barbers.component.html',
  styleUrl: './barbers.component.scss'
})
export class BarbersComponent {
  public barberResponse!:getAvailableBarbersModels;
  readonly lastName = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);
  constructor(private barbersService:BarbersAdministrationService){
  }
  ngOnInit(): void{
    this.barberResponse = new getAvailableBarbersModels();
    this.getBarbers();
  }
  public getBarbers(): void{
    this.barbersService.getAvailableBarbers().subscribe({next:(response)=>{
      this.barberResponse = response;
    }})
  }  
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {name: this.name(), lastName: this.lastName()},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log(result);
        // this.lastName.set(result);
      }
    });
  }
}
