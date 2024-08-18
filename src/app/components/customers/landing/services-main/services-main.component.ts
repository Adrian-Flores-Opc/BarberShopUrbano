import { Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-services-main',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatExpansionModule],
  templateUrl: './services-main.component.html',
  styleUrl: './services-main.component.scss'
})
export class ServicesMainComponent {
  readonly panelOpenState = signal(false);
}
