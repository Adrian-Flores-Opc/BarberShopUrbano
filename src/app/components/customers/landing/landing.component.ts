import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CarouselMainComponent } from './carousel-main/carousel-main.component';
import { InformationMainComponent } from './information-main/information-main.component';
import { ServicesMainComponent } from './services-main/services-main.component';
import { ArtistsMainComponent } from './artists-main/artists-main.component';
import { CarouselMinimalMainComponent } from './carousel-minimal-main/carousel-minimal-main.component';



@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CarouselMainComponent, InformationMainComponent, ServicesMainComponent, ArtistsMainComponent, CarouselMinimalMainComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
