import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { createClient, dataClient, DetailPayment, filterClient, PaymentRegisterRequest, registerBox, ServiceBarber } from '../../../../models/viewusers/user-administration.model.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddClientComponent } from '../opendialogs/dialog-add-client/dialog-add-client.component';
import { DialogFilterClientComponent } from '../opendialogs/dialog-filter-client/dialog-filter-client.component';
import { BarbersAdministrationService } from '../../../../core/barbers-administration.service';
import { CommonOperations } from '../../../../Common/common.operations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-boxes',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule, MatInputModule, FormsModule, MatSelectModule, MatCheckboxModule,MatIconModule, MatFormFieldModule, MatTableModule],
  templateUrl: './boxes.component.html',
  styleUrl: './boxes.component.scss',
  providers: [CommonOperations]
})
export class BoxesComponent {
  displayedColumns: string[] = ['guid','deleteEmployee','idTypeService', 'typeService', 'price', 'qty','discount','subTotal'];
  public Element:registerBox[]= [];
  isGuidColumnHidden = false;
  dataSource = new MatTableDataSource(this.Element);  
  isChecked: boolean = false; // Inicializa con el valor deseado
  selectedValue!: string;
  idSelectedValue!: number;
  totalValue!: string;
  cashAmount!: string;
  changeAmount!: string;
  services: ServiceBarber[]  = [];
  idReservation!: string;
  isReadOnlyReservation = true; // Por defecto, el campo está en modo de solo lectura  
  public client!:createClient;
  public clientSelected!: dataClient;
  nameClient!: filterClient;
  price!: string;
  priceTest!: string;
  qty!: string;
  discount!: string;
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
    this.cleanFieldsReservation(!newValue);
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
          this.common.showAlert("Client Create Succesfull","success","#000","#FFF");
          this.nameClient.idClient = response.idClient;
          this.nameClient.namesClient = client.lastName + " " + client.motherLastName + " " + client.names;
        }
        else{
          this.common.showAlert("Client not create, contact the administrator","error","#000","#FFF");
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
    this.barbersService.getInformationReservation(this.idReservation).subscribe({next:(response)=>{
      console.log(response);
      if(response.respCode == "00")
      {
        this.nameClient.idClient = response.dataReservation.id;
        this.nameClient.namesClient = response.dataReservation.lastName + " " + response.dataReservation.motherLastName + " " + response.dataReservation.names;
      }
      else
      {
        this.common.showAlert("Reservation not found, please retry your search!","error","#000","#FFF");
      }      
    }})
  }
  addItem(): void{    
    let aux = new registerBox;
    aux.guid = uuidv4();
    aux.idTypeService = this.idSelectedValue;
    const selectedService = this.services.find(service => service.id === this.selectedValue);
    if (selectedService) {
      aux.typeService =  selectedService.descriptionService;
    }    
    console.log(this.totalValue);
    aux.price = parseFloat(this.price);
    aux.qty = parseFloat(this.qty);
    aux.discount = parseFloat(this.price) * (parseFloat(this.discount) / 100);   
    aux.subTotal = (aux.price - aux.discount)* aux.qty;
    console.log(this.totalValue);
    if(this.totalValue===undefined|| this.totalValue === 'NaN' || this.totalValue ==="")
      this.totalValue = "0.00";
    this.totalValue = (parseFloat(this.totalValue) + aux.subTotal).toString();
    this.Element.push(aux);
    this.dataSource = new MatTableDataSource(this.Element); 
  }
  eliminarFila(element: any) {
    console.log(element.guid);
    const indiceDelElemento = this.Element.findIndex(item => item.guid === element.guid);
    if (indiceDelElemento !== -1) {
        console.log('Índice del elemento encontrado:', indiceDelElemento);
        this.Element.splice(indiceDelElemento, 1);
        this.totalValue = (parseFloat(this.totalValue) - element.subTotal).toString();
        this.dataSource = new MatTableDataSource(this.Element); 
    }
    // Encuentra el índice de la fila en tu fuente de datos (por ejemplo, un arreglo)
    // const index = this.Element.indexOf(item);
    // if (index !== -1) {
    //   this.Element.splice(index, 1); // Elimina la fila
    // }
    // this.dataSource = new MatTableDataSource(this.Element);
  }
  onServiceSelectionChange(selectedId: string): void {    
    const parts = selectedId.split("|");
    this.idSelectedValue = parseFloat(parts[0]);
    this.price = parts[1];
  }    
  validateChange() {
    if (this.totalValue !== null) {
      this.changeAmount = (parseFloat(this.cashAmount) - parseFloat(this.totalValue)).toString();
    }
  }
  registerTransaction(){
    let payment = new PaymentRegisterRequest();
    if(!this.isChecked)
      payment.idReservation = 0;
    else
      payment.idReservation = Number(this.idReservation);
    payment.idClient = Number(this.nameClient.idClient);
    payment.idBarber = Number("0");
    payment.total = parseFloat(this.totalValue);
    payment.cash = parseFloat(this.cashAmount);
    payment.change = parseFloat(this.changeAmount);
    this.Element.forEach(element => {
      let aux = new DetailPayment;
      aux.typeService = element.idTypeService;
      aux.price = element.price;
      aux.qty = element.qty;
      aux.discount = element.discount;
      aux.subTotal = element.subTotal;
      payment.detail.push(aux);
    });
    console.log(JSON.stringify(payment));
    this.barbersService.registerPayment(payment).subscribe({next:(response)=>{
      console.log("RESPONSE: " + response.respCode);
      if(response.respCode === '00')
        {
          this.common.showAlert("Register Successfull","success","#000","#FFF");
          this.clearFields();
        }
        else{
          this.common.showAlert("Register not made, contact the administrator","error","#000","#FFF");
        }          
    }})
  }
  clearFields(){
    this.isChecked = false; // Cambia el valor del checkbox
    this.cleanFieldsReservation(true);
    this.selectedValue ='-1';
  }
  cleanFieldsReservation(newValue: boolean) {
    this.isReadOnlyReservation = newValue;
    this.idReservation = "";
    this.nameClient = new filterClient();
    this.price = "";
    this.qty = "";
    this.discount ="";
    this.Element = [];
    this.dataSource = new MatTableDataSource(this.Element); 
    this.totalValue = "";
    this.cashAmount = "";
    this.changeAmount = "";
  }
}

