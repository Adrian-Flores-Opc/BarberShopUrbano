import {ChangeDetectionStrategy, Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { BarbersAdministrationService } from '../../../../../core/barbers-administration.service';
import { barberCreateRequest, barberModel, getAvailableBarbersModels } from '../../../../../models/viewbookings/barbers-administration.model';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-detail.barber',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule, MatInputModule, FormsModule, MatIconModule],
  templateUrl: './detail.barber.component.html',
  styleUrl: './detail.barber.component.scss'
})
export class DetailBarberComponent {
  showUpdateButton = true; // Por defecto, el botón está visible
  showConfirmButton = false; // Por defecto, el botón está visible
  public barberResponse!:getAvailableBarbersModels;
  public idBarber!:string;
  public barberUpdateqRequest!:barberCreateRequest;
  isReadOnly = true; // Por defecto, el campo está en modo de solo lectura
  imageSrc: string | ArrayBuffer | null = null;
  base64String!: string;

  constructor(private barbersService:BarbersAdministrationService, private route: ActivatedRoute, private router: Router){
  }
  ngOnInit(): void{ 
    this.route.paramMap.subscribe((params: ParamMap) => {
      console.log('DATO ROUTER: ' + params.get('id'))
    }); 
    this.idBarber = this.route.snapshot.paramMap.get('id') || "";
    this.barberResponse = new getAvailableBarbersModels();
    this.barberUpdateqRequest = new barberCreateRequest();    
    this.getBarber();
  }
  toggleReadOnly() {    
    this.showUpdateButton = false;
    this.showConfirmButton = true;
    this.isReadOnly = false;   
    }

toggleCancel() {
  this.showUpdateButton = true;
  this.showConfirmButton = false;
  this.barbersService.getAvailableBarber(this.idBarber).subscribe({next:(response)=>{
    console.log(response.barbers);
    this.barberResponse = response;    
  }})  
  this.isReadOnly = true;
}
updateBarber() {
  console.log(this.barberResponse)
  this.showUpdateButton = true;
  this.showConfirmButton = false;
  this.isReadOnly = true;
  this.barberUpdateqRequest.trace="123456";
  this.barberUpdateqRequest.barber = this.barberResponse.barbers[0]; 
  this.convertToBase64(this.imageSrc);
  this.barberUpdateqRequest.barber.image = this.base64String;
  console.log(this.barberUpdateqRequest);
  this.barbersService.sendUpdateBarber(this.barberUpdateqRequest).subscribe({next:(response)=>{
    console.log("RESPONSE: " + response.respCode);
    if(response.respCode === '00')
      {
        alert("Se actualizo el barbero correctamente");
        this.getBarber();
      }
      else{
        alert("No se actualizo el barbero correctamente");
      }          
  }})
}
deleteBarber(){
  this.barbersService.deleteBarber(this.idBarber).subscribe({next:(response)=>{
    console.log("RESPONSE: " + response.respCode);
    if(response.respCode === '00')
      {
        this.router.navigate(['/Users/Dashboard/Barbers']);
        alert("Se eliminó el barbero correctamente");
      }
      else{
        alert("No se eliminó el barbero correctamente");
      }          
  }})
}
  public getBarber(): void{
    this.barbersService.getAvailableBarber(this.idBarber).subscribe({next:(response)=>{
      console.log(response.barbers);
      this.barberResponse = response;
      this.imageSrc = this.barberResponse.barbers[0].image;
    }})
  }
  backFunction(){
    this.router.navigate(['/Users/Dashboard/Barbers']);
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;        
      };
      reader.readAsDataURL(file);
    }
  }
  convertToBase64(imageSrc: string | ArrayBuffer | null): void {
    if (typeof imageSrc === 'string') {
      this.base64String = imageSrc.split(',')[1]; // Elimina el prefijo 'data:image/...;base64,'
    } else if (imageSrc instanceof ArrayBuffer) {
      const binary = String.fromCharCode(...new Uint8Array(imageSrc));
      this.base64String = window.btoa(binary);
    }
  }
}


