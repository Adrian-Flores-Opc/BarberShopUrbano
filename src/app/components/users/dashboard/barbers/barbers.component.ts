import {Component,inject, model, signal} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { BarbersAdministrationService } from '../../../../core/barbers-administration.service';
import { barbersModels, genericResponse, getAvailableBarbersModels } from '../../../../models/viewbookings/barbers-administration.model'; 
import { barberModel } from '../../../../models/viewbookings/barbers-administration.model'
import { barberCreateRequest } from '../../../../models/viewbookings/barbers-administration.model'

import {FormsModule} from '@angular/forms';
import { DialogOverviewExampleDialog } from '../opendialogs/dialog-add-barber/dialog-add-barber.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle, } from '@angular/material/dialog';


@Component({
  selector: 'app-barbers',
  templateUrl: './barbers.component.html',
  styleUrl: './barbers.component.scss',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule,MatIconModule,MatDividerModule,MatFormFieldModule, MatInputModule, MatTableModule],
})
export class BarbersComponent {  
  public barberResponse!:getAvailableBarbersModels;
  public createBarberResponse!:genericResponse;
  public barberCreateqRequest!:barberCreateRequest;
  public barber!:barberModel;  
  readonly dialog = inject(MatDialog);
  public displayedColumns: string[] = ['lastname', 'motherlastname', 'names', 'alias'];
  public Element!:barbersModels[];
  public dataSource = new MatTableDataSource(this.Element);
  clickedRows = new Set<barbersModels>();
  constructor(private barbersService:BarbersAdministrationService, private router: Router){
    // this._activeRouter.params.subscribe(params => console.log('DATO DEL ROUTER:' + params));
  }
  ngOnInit(): void{
    this.barberResponse = new getAvailableBarbersModels();
    this.getBarbers();
  }
  public getBarbers(): void{
    this.barbersService.getAvailableBarbers().subscribe({next:(response)=>{
      console.log(response.barbers);
      this.dataSource = new MatTableDataSource(response.barbers);
    }})
  }  
  handleRowClick(row: barbersModels) {
    console.log('entro: ' + row.id);
    this.openDetail(row.id);    
    // Aquí puedes agregar cualquier otra lógica que necesites
    this.router.navigate(['/Users/Dashboard/Barbers/Details/'+ row.id]);
}
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {barber: this.barber},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log(result.data);
        console.log(JSON.stringify(result.data));
        this.createBarber(result.data);
      }
    });
  }
  openDetail(id:number): void {
    this.router.navigate(['/Dashboard/Details/'+id]);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  public createBarber(barber:barbersModels): void{    
    this.barberCreateqRequest = new barberCreateRequest();
    this.barberCreateqRequest.trace = "1234567";
    this.barberCreateqRequest.barber = barber;
    this.barbersService.sendCreateBarber(this.barberCreateqRequest).subscribe({next:(response)=>{
      console.log("RESPONSE: " + response.respCode);
      if(response.respCode === '00')
        {
          alert("Se creo el barbero correctamente");
          this.getBarbers();
        }
        else{
          alert("No se creo el barbero correctamente");
        }          
    }})
  }
}
