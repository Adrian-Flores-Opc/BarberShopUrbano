import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { BarbersAdministrationService } from '../../../../core/barbers-administration.service';
import { getAvailableBarbersModels } from '../../../../models/viewbookings/barbers-administration.model'; 
@Component({
  selector: 'app-barbers',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule],
  templateUrl: './barbers.component.html',
  styleUrl: './barbers.component.scss'
})
export class BarbersComponent {
  public barberResponse!:getAvailableBarbersModels;
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
}
