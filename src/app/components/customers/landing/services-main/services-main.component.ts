import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-services-main',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './services-main.component.html',
  styleUrl: './services-main.component.scss'
})
export class ServicesMainComponent {

}
