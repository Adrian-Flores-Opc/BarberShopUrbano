import { Component } from '@angular/core';
import { BarbersComponent } from '../barbers/barbers.component';
import { BoxesComponent } from '../boxes/boxes.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  standalone: true,
  imports: [BarbersComponent, BoxesComponent, RouterOutlet],
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.scss'
})
export class MainNavComponent {

}
