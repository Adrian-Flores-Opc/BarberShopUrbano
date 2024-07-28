import {ChangeDetectionStrategy, Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { BarbersAdministrationService } from '../../../../../core/barbers-administration.service';
import { barberCreateRequest, barberModel, getAvailableBarbersModels } from '../../../../../models/viewbookings/barbers-administration.model';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-detail.barber',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule, MatInputModule, FormsModule],
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
  constructor(private barbersService:BarbersAdministrationService, private route: ActivatedRoute){
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
    }})
  }
  handleFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      console.log(event.target.result);
      this.barberResponse.barbers[0].image = event.target.result;
      this.convertToBase64(file);
    }
  }
  convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      const base64Fragment = base64String.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
      console.log('Fragmento base64:', base64Fragment);
      // this.barberUpdateqRequest.barber.image = base64Fragment;
    };
    reader.readAsDataURL(file);
  }
}


