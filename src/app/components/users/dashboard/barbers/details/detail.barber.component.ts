import {ChangeDetectionStrategy, Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { BarbersAdministrationService } from '../../../../../core/barbers-administration.service';
import { barberModel, getAvailableBarbersModels } from '../../../../../models/viewbookings/barbers-administration.model';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

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
  public auxBarberResponse!:getAvailableBarbersModels;
  public idBarber!:string;
  isReadOnly = true; // Por defecto, el campo está en modo de solo lectura
  constructor(private barbersService:BarbersAdministrationService, private route: ActivatedRoute){
  }
  ngOnInit(): void{    
    this.barberResponse = new getAvailableBarbersModels();
    this.auxBarberResponse = new getAvailableBarbersModels();
    this.route.queryParams.subscribe(params => {
      console.log(params['idBarber']);
      this.idBarber = params['idBarber']; // Nombre del parámetro de consulta
    });
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
  this.barberResponse = this.auxBarberResponse;
  console.log('AUX: ' + JSON.stringify(this.auxBarberResponse))
  console.log('TIT: ' + JSON.stringify(this.barberResponse))
  this.isReadOnly = true;
}
updateBarber() {
  console.log(this.barberResponse)
  this.showUpdateButton = true;
  this.showConfirmButton = false;
  this.isReadOnly = true;
  alert('Modificación Exitosa');
}
  public getBarber(): void{
    this.barbersService.getAvailableBarber('1014').subscribe({next:(response)=>{
      console.log(response.barbers);
      this.barberResponse = response;
      this.auxBarberResponse = response;
    }})
  }  
}

