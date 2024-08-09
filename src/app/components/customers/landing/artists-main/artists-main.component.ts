import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-artists-main',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './artists-main.component.html',
  styleUrl: './artists-main.component.scss'
})
export class ArtistsMainComponent {

}
