import { CommonModule } from '@angular/common';
import { Component, inject, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { createClient, dataClient, filterClient, ServiceBarber } from '../../../../models/viewusers/user-administration.model.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddClientComponent } from '../opendialogs/dialog-add-client/dialog-add-client.component';
import { DialogFilterClientComponent } from '../opendialogs/dialog-filter-client/dialog-filter-client.component';
import { BarbersAdministrationService } from '../../../../core/barbers-administration.service';
import { filter } from 'rxjs';
import { CommonOperations } from '../../../../Common/common.operations';

@Component({
  selector: 'app-boxes',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule, MatInputModule, FormsModule, MatSelectModule, MatCheckboxModule,MatIconModule],
  templateUrl: './boxes.component.html',
  styleUrl: './boxes.component.scss',
  providers: [CommonOperations]
})
export class BoxesComponent {
  selectedValue!: string;
  services: ServiceBarber[]  = [];
  idReservation!: string;
  isReadOnlyReservation = true; // Por defecto, el campo está en modo de solo lectura  
  public client!:createClient;
  public clientSelected!: dataClient;
  nameClient!: filterClient;
  readonly dialog = inject(MatDialog);
  constructor(private barbersService:BarbersAdministrationService,
              private common: CommonOperations){
    
  }
  ngOnInit(): void{ 
    this.getServices();
    this.client = new createClient();
    this.nameClient = new filterClient();
  }
  public getServices(): void{
    this.barbersService.getServicesBarber().subscribe({next:(response)=>{
      if(response.respCode =="00")
      {
        this.services = [];
        response.services.forEach(element => {
          const service = new ServiceBarber();
          service.id = element.id + "|" + element.price;
          service.descriptionService = element.description;
          this.services.push(service);       
        });
        
      }
      else
      {
        this.common.showAlert("An error was generated, contact the administrator","error","#000","#FFF");
      }      
    }})
    
  }
  onModelChange(newValue: boolean) {
    this.isReadOnlyReservation = !newValue;
    this.idReservation = "";
    this.nameClient = new filterClient();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddClientComponent, {
      data: {client: this.client},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {        
        this.createUser(result.data);
      }
    });
  }
  public createUser(client:createClient): void{    
    this.barbersService.createClient(client).subscribe({next:(response)=>{
      console.log("RESPONSE: " + response.respCode);
      if(response.respCode === '00')
        {
          this.nameClient.idClient = response.idClient;
          this.nameClient.namesClient = client.lastName + " " + client.motherLastName + " " + client.names;
        }
        else{
          alert("No se creo el barbero correctamente");
        }          
    }})
  }
  openDialogSarchClient(): void {
    const dialogRef = this.dialog.open(DialogFilterClientComponent, {
      data: {client: this.clientSelected},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {        
        this.nameClient.idClient = result.data.id;
        this.nameClient.namesClient = result.data.lastName + " " + result.data.motherLastName + " " + result.data.names;
     }
    });
  }
  searchReservation(): void{
    alert('ENTRO');
    this.barbersService.getInformationReservation(this.idReservation).subscribe({next:(response)=>{
      console.log(response);
      if(response.respCode == "00")
      {
        this.nameClient.idClient = response.dataReservation.id;
        this.nameClient.namesClient = response.dataReservation.lastName + " " + response.dataReservation.motherLastName + " " + response.dataReservation.names;
      }      
    }})
  }
}
